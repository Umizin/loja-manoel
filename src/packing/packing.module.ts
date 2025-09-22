import { Module } from '@nestjs/common';
import { PackingService } from './packing.service';

@Module({
  providers: [PackingService]
})
export class PackingModule {}
