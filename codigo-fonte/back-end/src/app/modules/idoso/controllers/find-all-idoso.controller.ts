import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { QueryBuilderService } from '@utils/query-builder/query-builder.service';
import { QueryValidator } from '@utils/query-builder/dto/queryValidator.dto';
import { FindAllIdososService } from '../services/find-all-idoso.service';
import { Idoso } from '../entities/idoso.entity';

@ApiTags('Idosos')
@Controller('idosos')
export class FindAllIdosoController {
    constructor(
        private findAllIdoso: FindAllIdososService,
        private query: QueryBuilderService,
    ) { }

    @Get()
    @ApiQuery({
        type: QueryValidator,
    })
    @ApiOkResponse({
        type: Idoso,
        isArray: true,
    })
    async handle(): Promise<AppResponse<Idoso[]>> {
        const { page_limit, page_number, ...query } = await this.query.query();

        const { idosos, count } = await this.findAllIdoso.execute(query);

        return new AppResponse(idosos, {
            page_limit,
            page_number,
            total_count: count,
        });
    }
}
