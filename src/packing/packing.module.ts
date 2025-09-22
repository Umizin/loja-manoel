import { Module } from '@nestjs/common';
import { PackingService } from './packing.service';

@Module({
  providers: [PackingService],
  exports: [PackingService],
})
export class PackingModule {}
