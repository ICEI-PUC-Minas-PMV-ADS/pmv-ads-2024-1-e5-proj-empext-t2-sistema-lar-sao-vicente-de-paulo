import { Body, Controller, Post } from "@nestjs/common";
import { CreateIdosoService } from "../services/create-idoso.service";
import { CreateIdosoDto } from "../dtos/create-idoso.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Idosos')
@Controller('idosos')
export class CreateIdosoController {
    constructor(private createIdoso: CreateIdosoService) { }

    @Post()
    async handle(@Body() data: CreateIdosoDto): Promise<void> {
        await this.createIdoso.execute(data)
    }
}