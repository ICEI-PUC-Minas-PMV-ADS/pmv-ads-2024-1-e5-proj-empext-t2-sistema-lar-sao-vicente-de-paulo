export const paginate = (query) => {
    if (query.page_number) {
        query.skip = (query.page_number - 1) * query.page_limit;
    }

    if (query.page_limit) {
        query.take = query.page_limit;
    }

    return query;
};
