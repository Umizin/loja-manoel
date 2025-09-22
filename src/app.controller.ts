import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PedidoDto } from './dto/pedido.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Endpoints de Teste')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('teste-empacotamento')
  @ApiOperation({
    summary: 'Teste para validar o DTO(Objeto de Transferência de Dados)',
  })
  testeEmpacotamento(@Body() pedidoDto: PedidoDto): any {
    console.log('Dados recebidos e validados: ', pedidoDto);
    return {
      message: 'Pedido recebido e validade com sucesso!',
      data: pedidoDto,
    };
  }
}
