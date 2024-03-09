import { Expose } from 'class-transformer';

class QueryPaginate {
    @Expose()
    page_limit?: number;

    @Expose()
    page_number?: number;
}

export class QueryResponse extends QueryPaginate {
    @Expose()
    where: any;

    @Expose()
    orderBy?: any;

    @Expose()
    skip?: any;

    @Expose()
    take?: any;

    @Expose()
    select?: any;

    @Expose()
    include?: any;
}
