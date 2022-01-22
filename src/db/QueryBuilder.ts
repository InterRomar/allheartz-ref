/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as typeorm from 'typeorm';

const extraConditions = {
  or: typeorm.Any,
  between: ([a, b]: any[]) => typeorm.Between(a, b),
  equal: typeorm.Equal,
  iLike: typeorm.ILike,
  in: typeorm.In,
  isNull: typeorm.IsNull,
  lt: typeorm.LessThan,
  lte: typeorm.LessThanOrEqual,
  like: typeorm.Like,
  gt: typeorm.MoreThan,
  gte: typeorm.MoreThanOrEqual,
  not: typeorm.Not,
};

type FilterOptions = { [key: string]: any };

type PaginationOptions = {
  page: number;
  perPage: number;
};

type SortingOptions = {
  sortBy: string;
  sortDirection: 'straight' | 'reverse';
}

export type QueryBuilderOptions = {
  filter?: FilterOptions;
  pagination?: {
    page: number | string;
    perPage: number | string;
  };
  sort?: SortingOptions;
}

type QueryBuilderResult = {
  order?: { [key: string]: 'ASC' | 'DESC'; };
  take: number;
  skip?: number;
  where?: { [key: string]: any };
}

class QueryBuilder {
  filter?: FilterOptions;

  pagination?: PaginationOptions;

  sort?: SortingOptions;

  constructor(options?: QueryBuilderOptions) {
    if (!options) { return; }
    this.filter = options.filter;
    if (options.pagination) {
      this.pagination = {
        page: +options.pagination.page,
        perPage: +options.pagination.perPage,
      };
    }
    if (options.sort) {
      this.sort = options.sort;
    }
  }

  getSort(): { order?: { [key: string]: 'ASC' | 'DESC'; } } {
    if (!this.sort || !this.sort.sortBy) {
      return {};
    }

    return {
      order: {
        [this.sort.sortBy]: (this.sort.sortDirection || 'straight') === 'straight' ? 'ASC' : 'DESC',
      },
    };
  }

  getPagination(): { take: number; skip?: number; } {
    const {
      page = 1,
      perPage,
    } = this.pagination || {};

    const limit = perPage || 0;
    const offset = perPage ? perPage * (page - 1) : 0;

    return {
      take: limit,
      skip: offset,
    };
  }

  getFilter(): { where?: { [key: string]: any } } {
    if (!this.filter) {
      return {};
    }

    let where = this.parseFilterItem(this.filter);
    if (where._type === 'any') {
      where = where._value;
    }

    return {
      where,
    };
  }

  parseFilterItem(value: any, key?: string): any {
    const parsedKey = (key || '').split(/\[|\]/);
    // @ts-ignore-next-line
    const searchingMethod = extraConditions[parsedKey[1]];

    let filteredData = value;
    let filteredKey = key;

    if (searchingMethod) {
      filteredData = searchingMethod(this.parseFilterItem(value));
      filteredKey = parsedKey[0];
    } else if (Array.isArray(value)) {
      filteredData = value.map((i) => this.parseFilterItem(i));
    } else if (value && typeof value === 'object' && !value.getDay) {
      let obj = {};
      const keys = Object.keys(value);
      for (let i = 0; i < keys.length; i++) {
        const objectKey = keys[i];

        const parsedObject = this.parseFilterItem(value[objectKey], objectKey);
        if (parsedObject._type) {
          obj = parsedObject;
          break;
        }

        obj = {
          ...obj,
          ...parsedObject,
        };
      }

      filteredData = obj;
    }

    if (!filteredKey) {
      return filteredData;
    }
    return { [filteredKey]: filteredData };
  }

  getQuery(): QueryBuilderResult {
    return {
      ...this.getSort(),
      ...this.getPagination(),
      ...this.getFilter(),
    };
  }
}

export default QueryBuilder;
