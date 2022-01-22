import * as typeorm from 'typeorm';
import _ from 'lodash';

import QueryBuilder, { QueryBuilderOptions } from '../QueryBuilder';

export type EntityDataType<T> = Omit<typeorm.DeepPartial<T>, 'createdAt' | 'updatedAt' | 'deletedAt' | 'hasId' | 'softRemove' | 'save' | 'recover' | 'reload' | 'remove'>

export type AdditionalSearchOptions<Entity> = {
  withDeleted?: boolean;
  select?: (keyof Entity)[];
  relations?: string[];
  cache?: boolean;
}

class BaseService<EntityType> {
  private Entity: typeorm.EntityTarget<EntityType>;

  repo: typeorm.Repository<EntityType>;

  constructor(Entity: typeorm.EntityTarget<EntityType>) {
    this.Entity = Entity;
    this.getRepo();
  }

  private getRepo = (): void => {
    try {
      this.repo = typeorm.getConnection('main').getRepository(this.Entity);
    } catch {
      setTimeout(() => {
        this.getRepo();
      }, 20);
    }
  };

  create = async (
    data: EntityDataType<EntityType>,
  ): Promise<EntityType> => {
    const item = this.repo.create();

    Object.keys(data).forEach((key) => {
      // @ts-ignore-next-line
      item[key] = data[key];
    });

    const newItem = await this.repo.save(item);

    return newItem;
  };

  bulkCreate = async (
    items: EntityDataType<EntityType>[],
  ): Promise<typeorm.InsertResult> => {
    return this.repo
      .createQueryBuilder()
      .insert()
      .into(this.Entity)
      .values(items as any)
      .execute();
  };

  update = async (
    id: number,
    data: EntityDataType<EntityType>,
  ): Promise<EntityType> => {
    const item: Awaited<EntityType | undefined> = await this.getFullObjectById(id);

    if (!item) {
      throw new Error(`${this.repo.metadata.name} object not found.`);
    }

    Object.keys(data).forEach((key: string) => {
      // @ts-ignore-next-line
      item[key] = data[key];
    });

    const newItem = await this.repo.save(item);

    return newItem;
  };

  getById = async (
    id: number,
    options?: AdditionalSearchOptions<EntityType>,
  ): Promise<EntityType | undefined> => {
    const item = await this.repo.findOne(id, options);

    return item;
  };

  private getAllColumnsList = () => {
    return this.repo.metadata.columns.map((i) => i.propertyName) as (keyof EntityType)[];
  };

  getFullObjectById = async (id: number): Promise<EntityType | undefined> => {
    const allColumns = this.getAllColumnsList();
    const fullItem = await this.getById(id, { select: allColumns });

    return fullItem;
  };

  findFullObject = async (
    options: QueryBuilderOptions,
    additionalOptions?: AdditionalSearchOptions<EntityType>,
  ): Promise<EntityType | null> => {
    const allColumns = this.getAllColumnsList();
    const fullItem = await this.findOne(options, { ...additionalOptions, select: allColumns });

    return fullItem || null;
  };

  findOne = async (
    options?: QueryBuilderOptions,
    additionalOptions?: AdditionalSearchOptions<EntityType>,
  ): Promise<EntityType | null> => {
    const query: typeorm.FindOneOptions = {
      ...new QueryBuilder(options).getQuery(),
      ...additionalOptions,
    };
    delete query.order;
    const item = await this.repo.findOne(undefined, query);

    return item || null;
  };

  find = async (
    options?: QueryBuilderOptions,
    additionalOptions?: AdditionalSearchOptions<EntityType>,
  ): Promise<EntityType[]> => {
    const query: typeorm.FindManyOptions = {
      ...new QueryBuilder(options).getQuery(),
      ...additionalOptions,
    };
    const items = await this.repo.find(query);

    return items;
  };

  findAndCount = async (
    options?: QueryBuilderOptions,
    additionalOptions?: AdditionalSearchOptions<EntityType>,
  ): Promise<{
    data: EntityType[];
    page: number;
    totalPages: number;
    totalCount: number;
  }> => {
    const query: typeorm.FindManyOptions = {
      ...new QueryBuilder(options).getQuery(),
      ...additionalOptions,
    };

    const [items, count] = await this.repo.findAndCount(query);

    return {
      data: items,
      page: +_.get(options, 'pagination.page') || 1,
      totalPages: Math.ceil(count / _.get(options, 'pagination.perPage')) || 1,
      totalCount: count,
    };
  };

  count = async (
    options?: QueryBuilderOptions,
    additionalOptions?: AdditionalSearchOptions<EntityType>,
  ): Promise<number> => {
    const query: typeorm.FindManyOptions = {
      ...new QueryBuilder(options).getQuery(),
      ...additionalOptions,
    };

    const count = await this.repo.count(query);

    return count;
  };

  /**
   * Delete
   * @param id Entity id value
   */
  delete = async (id: number): Promise<void> => {
    const item = await this.getById(id);

    if (!item) {
      throw new Error(`${this.repo.metadata.name} object not found.`);
    }

    await this.repo.delete(item);
  };
}

export default BaseService;
