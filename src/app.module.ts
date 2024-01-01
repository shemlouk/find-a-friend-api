import { Module } from '@nestjs/common';
import { OrgModule } from './org/org.module';

@Module({ imports: [OrgModule], controllers: [], providers: [] })
export class AppModule {}
