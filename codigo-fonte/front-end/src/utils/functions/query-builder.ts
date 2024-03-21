import { IQuery } from '@/interface/IQuery';

export const queryBuilder = (query: IQuery) => {
    return {
        ...query,
        filter: query.filter ? JSON.stringify(query.filter) : undefined,
        populate: query.populate ? JSON.stringify(query.populate) : undefined,
        sort: query.sort ? JSON.stringify(query.sort) : undefined,
    };
};
