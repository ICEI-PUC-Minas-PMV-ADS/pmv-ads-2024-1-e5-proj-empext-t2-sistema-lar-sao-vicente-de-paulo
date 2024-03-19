import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { AppResponse } from '@/common/utils/app-response';
import { Idoso } from '../entities/idoso.entity';
import { FindUidIdosoService } from '../services/find-uid-idoso.service';

@ApiTags('Idosos')
@Controller('idosos')
export class FindUidIdosoController {
    constructor(private findUidIdoso: FindUidIdosoService) { }

    @Get(':uid')
    @ApiOperation({ summary: 'Retorna um idoso com base no seu UID' })
    @ApiParam({ name: 'uid', description: 'O UID do idoso a ser encontrado' })
    @ApiOkResponse({
        type: Idoso,
    })
    async handle(
        @Param('uid') uid: string,
    ): Promise<AppResponse<Idoso | null>> {
        const idoso = await this.findUidIdoso.execute(uid);

        return new AppResponse(idoso);
    }
}
