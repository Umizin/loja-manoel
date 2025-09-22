import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ProdutoDto } from './produto.dto';

export class PedidoDto {
  @ApiProperty({
    type: [ProdutoDto],
    description: 'Lista de produtos que estão no pedido.',
  })
  @IsArray({ message: 'O campo produtos deve ser um array.' })
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
export { ProdutoDto };

