export type Operator =
    | 'contains'
    | 'endsWith'
    | 'startsWith'
    | 'equals'
    | 'gt'
    | 'gte'
    | 'in'
    | 'lt'
    | 'lte'
    | 'not'
    | 'notIn'
    | 'hasEvery'
    | 'hasSome'
    | 'has'
    | 'isEmpty';

export type FiltersField = {
    path: string;
    value?: any;
    insensitive?: boolean;
    operator?: Operator;
    filterInsideOperator?: 'none' | 'some' | 'every';
    filterGroup?: 'and' | 'or' | 'not' | 'filter';
    or?: Filter;
    and?: Filter;
    not?: Filter;
    filter?: Filter;
};

export type ParsedFilter = FiltersField & {
    type: 'string' | 'number' | 'boolean' | 'date';
    filterGroup?: 'and' | 'or' | 'not' | 'filter';
};

export type Filter = Array<FiltersField | { or: Filter } | { and: Filter } | { not: Filter } | { filter: Filter }>;

export type Populate = Array<{
    filter?: Filter;
    populate?: Populate;
    primaryKey?: string;
    path: string;
    select: string;
}>;

export interface SortFields {
    field: string;
    criteria?: 'asc' | 'desc';
}

export interface IQuery {
    select?: string;
    page_number?: number;
    page_limit?: number;
    sort?: SortFields[];
    populate?: Populate;
    filter?: Filter;
}
