import { Controller, Get } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { FindAllUsuarioService } from '../services/find-all-usuario.service';
import { AppResponse } from '@/common/utils/app-response';
import { Usuario } from '../entities/usuario.entity';
import { Roles } from '@/common/decorators/roles.decorator';
import { RoleUsuario } from '@/common/enums/roles';
import { QueryBuilderService } from '@utils/query-builder/query-builder.service';
import { QueryValidator } from '@utils/query-builder/dto/queryValidator.dto';

@ApiTags('usuarios')
@Controller('usuarios')
@ApiBearerAuth()
export class FindAllUsuarioController {
    constructor(
        private findAllUsuario: FindAllUsuarioService,
        private query: QueryBuilderService,
    ) {}

    @Get()
    @ApiQuery({
        type: QueryValidator,
    })
    @ApiOkResponse({
        type: Usuario,
        isArray: true,
    })
    @Roles(RoleUsuario.FIND_ALL)
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
