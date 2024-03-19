import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindAllUsuarioService } from '../services/find-all-usuario.service';
import { AppResponse } from '@/common/utils/app-response';
import { Usuario } from '../entities/usuario.entity';
import { QueryBuilderService } from '@utils/query-builder/query-builder.service';
import { QueryValidator } from '@utils/query-builder/dto/queryValidator.dto';

@ApiTags('Usuarios')
@Controller('usuarios')
export class FindAllUsuarioController {
    constructor(
        private findAllUsuario: FindAllUsuarioService,
        private query: QueryBuilderService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Lista todos os usuários com paginação' })
    @ApiQuery({
        type: QueryValidator,
    })
    @ApiOkResponse({
        type: Usuario,
        isArray: true,
    })
    async handle(): Promise<AppResponse<Usuario[]>> {
        const { page_limit, page_number, ...query } = await this.query.query();

        const { usuarios, count } = await this.findAllUsuario.execute(query);

        return new AppResponse(usuarios, {
            page_limit,
            page_number,
            total_count: count,
        });
    }
}
