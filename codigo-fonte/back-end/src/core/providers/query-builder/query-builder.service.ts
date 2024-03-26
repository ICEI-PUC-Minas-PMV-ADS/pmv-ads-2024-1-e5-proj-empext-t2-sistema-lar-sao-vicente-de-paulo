import { Global, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { Request } from 'express';
import { defaultPlainToClass } from './plainToClass.fn';
import defaultValidateOrReject from './validateOrReject.fn';
import { QueryResponse } from './dto/queryResponse.dto';
import { QueryValidator } from './dto/queryValidator.dto';
import { filter } from './functions/filter.fn';
import { paginate } from './functions/paginate.fn';
import { populate } from './functions/populate.fn';
import { select } from './functions/select.fn';
import { sort } from './functions/sort.fn';

@Global()
@Injectable()
export class QueryBuilderService {
    constructor(@Inject(REQUEST) private readonly request: Request) {}

    /**
     * @returns {Promise<QueryResponse>} This will return your query to prisma
     * @seemore https://github.com/HarielThums/nestjs-prisma-querybuilder
     */

    async query(): Promise<QueryResponse> {
        const requestQueryParsed = this.request.query;

        if (
            requestQueryParsed.filter &&
            typeof requestQueryParsed.filter === 'string'
        )
            requestQueryParsed.filter = JSON.parse(
                this.request.query?.filter as string,
            );

        if (
            requestQueryParsed.populate &&
            typeof requestQueryParsed.populate === 'string'
        )
            requestQueryParsed.populate = JSON.parse(
                this.request.query?.populate as string,
            );

        if (
            requestQueryParsed.sort &&
            typeof requestQueryParsed.sort === 'string'
        )
            requestQueryParsed.sort = JSON.parse(
                this.request.query?.sort as string,
            );

        const queryValidator = defaultPlainToClass(
            QueryValidator,
            requestQueryParsed,
        );

        await defaultValidateOrReject(queryValidator);

        const query = this.buildQuery(queryValidator);

        return query;
    }

    private buildQuery(query: QueryValidator) {
        query.page_number =
            Number(query.page_number) > 0 ? Number(query.page_number) : 1;
        query.page_limit =
            Number(query.page_limit) > 0 ? Number(query.page_limit) : 10;

        query = sort(query);

        query = paginate(query);

        query = select(query);

        query = populate(query);

        query = filter(query);

        if (query.select?.hasOwnProperty('all')) delete query.select;

        return plainToClass(QueryResponse, query, {
            excludeExtraneousValues: true,
        });
    }
}
