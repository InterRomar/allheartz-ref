import { DefaultNamingStrategy, Table, NamingStrategyInterface } from 'typeorm';

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  // eslint-disable-next-line class-methods-use-this
  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    referencedTablePath = 'unknown',
    referencedColumnNames: string[] = [],
  ): string {
    const tableName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;

    const fkName = `fk_${tableName}<=${referencedTablePath}.${columnNames.length ? columnNames.join('.') : ''}${referencedColumnNames.join(`&${referencedTablePath}.`)}`;

    return fkName;
  }
}

export default CustomNamingStrategy;
