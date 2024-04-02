import { QueryValidator } from '../dto/queryValidator.dto';

export const sort = (
    query: QueryValidator & {
        orderBy?: object[];
    },
) => {
    if (query.sort) {
        query.orderBy = [];

        query.sort.forEach((v) => {
            query.orderBy.push({ [v.field]: v.criteria });
        });

        delete query.sort;
    }

    return query;
};
