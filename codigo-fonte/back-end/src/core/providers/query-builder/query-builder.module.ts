import { Module } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';

@Module({
    providers: [QueryBuilderService],
    exports: [QueryBuilderService],
})
export class QueryBuilderModule {}
