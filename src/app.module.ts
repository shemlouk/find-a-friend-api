import { Module } from '@nestjs/common';
import { OrgModule } from './org/org.module';
import { PetModule } from './pet/pet.module';

@Module({ imports: [OrgModule, PetModule], controllers: [], providers: [] })
export class AppModule {}
