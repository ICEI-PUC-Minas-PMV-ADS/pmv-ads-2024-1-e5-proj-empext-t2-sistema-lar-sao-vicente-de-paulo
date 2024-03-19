import { Body, Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteIdosoService } from '../services/delete-idoso.service';
import { DeleteIdosoDto } from '../dtos/delete-idoso.dto';

@ApiTags('Idosos')
@Controller('idosos')
export class DeleteIdosoController {
    constructor(private deleteIdoso: DeleteIdosoService) { }

    @Delete(':uid')
    async handle(@Body() data: DeleteIdosoDto, @Param('uid') uid: string): Promise<void> {
        await this.deleteIdoso.execute(data, uid);

        return;
    }
}
