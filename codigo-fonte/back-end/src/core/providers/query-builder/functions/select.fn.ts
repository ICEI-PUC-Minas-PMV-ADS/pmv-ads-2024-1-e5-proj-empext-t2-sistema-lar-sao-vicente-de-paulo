export const select = (query) => {
    const select = {};

    if (!query.select) {
        delete query.select;

        return query;
    }

    if (query.select) {
        query.select
            .split(' ')
            .map((v: string) => (v[0] === ' ' ? v.substring(1, v.length) : v))
            .filter((v: string) => v !== '')
            .map((v: string) => (select[v] = true));
    }

    query.select = select;

    return query;
};
