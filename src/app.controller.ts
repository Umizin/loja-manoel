import { Body, Controller, Get, Post } from '@nestjs/common';
import { PedidoDto } from './dto/pedido.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PackingService } from './packing/packing.service';

@ApiTags('Empacotamento')
@Controller()
export class AppController {
  constructor(private readonly packingService: PackingService) {}

  @Post('empacotar')
  @ApiOperation({ summary: 'Calcula o empacotamento para um ou mais pedidos' })
  empacotar(@Body() pedidoDto: PedidoDto): any {
    return this.packingService.empacotar(pedidoDto);
  }
}
