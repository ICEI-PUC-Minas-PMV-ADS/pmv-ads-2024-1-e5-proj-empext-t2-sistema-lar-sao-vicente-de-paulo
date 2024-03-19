import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateIdosoService } from '../services/update-idoso.service';
import { UpdateIdosoDto } from '../dtos/update-idoso.dto';

@ApiTags('Idosos')
@Controller('idosos')
export class UpdateIdosoController {
    constructor(private updateIdoso: UpdateIdosoService) { }

    @Put(':uid')
    async handle(
        @Param('uid') uid: string,
        @Body() data: UpdateIdosoDto,
    ): Promise<void> {
        await this.updateIdoso.execute(data, uid);

        return;
    }
}
