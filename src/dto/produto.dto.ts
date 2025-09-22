import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class ProdutoDto {
  @ApiProperty({ description: 'Altura do produto em centímetros', example: 10 })
  @IsNumber({}, { message: 'A altura deve ser um número.' })
  @IsPositive({ message: 'A altura deve ser um número positivo.' })
  @IsNotEmpty({ message: 'A altura não pode estar vazia.' })
  altura: number;

  @ApiProperty({
    description: 'Largura do produto em centímetros',
    example: 20,
  })
  @IsNumber({}, { message: 'A largura deve ser um número.' })
  @IsPositive({ message: 'A largura deve ser um número positivo.' })
  @IsNotEmpty({ message: 'A largura não pode estar vazia.' })
  largura: number;

  @ApiProperty({
    description: 'Comprimento do produto em centímetros',
    example: 30,
  })
  @IsNumber({}, { message: 'O comprimento deve ser um número.' })
  @IsPositive({ message: 'O comprimento deve ser um número positivo.' })
  @IsNotEmpty({ message: 'O comprimento não pode estar vazio.' })
  comprimento: number;
}
