import { Injectable } from '@nestjs/common';
import { PedidoDto, ProdutoDto } from '../dto/pedido.dto';

// Usando interfaces para deixar os objetos de trabalho mais simples

// Tamanho dos Objetos
interface Tamanhos {
  altura: number;
  largura: number;
  comprimento: number;
}

interface Caixa extends Tamanhos {
  nome: string;
  volume: number;
}

// Id Para versionar os produtos
interface Produto extends Tamanhos {
  id: number;
  volume: number;
}

interface CaixaEmUso {
  caixaInfo: Caixa;
  produtos: ProdutoDto[];
  volumeOcupado: number;
}

// Tipos de caixas disponíveis
const caixasDisponiveis: Caixa[] = [
  {
    nome: 'Caixa 1',
    altura: 30,
    largura: 40,
    comprimento: 80,
    volume: 30 * 40 * 80,
  },
  {
    nome: 'Caixa 2',
    altura: 50,
    largura: 50,
    comprimento: 40,
    volume: 50 * 50 * 40,
  },
  {
    nome: 'Caixa 3',
    altura: 50,
    largura: 80,
    comprimento: 60,
    volume: 50 * 80 * 60,
  },
].sort((a, b) => a.volume - b.volume);

@Injectable()
export class PackingService {
  /**
   * Onde Manteremos o processo de empacotamento.
   */
  empacotar(pedidoDto: PedidoDto): any {
    const produtos: Produto[] = pedidoDto.produtos.map((p, index) => ({
      id: index + 1,
      ...p,
      volume: p.altura * p.largura * p.comprimento,
    }));

    // Ordena os produtos do MAIOR para o MENOR volume.
    produtos.sort((a, b) => b.volume - a.volume);

    const caixasEmUso: CaixaEmUso[] = [];

    for (const produto of produtos) {
      let produtoEncaixotado = false;

      for (const caixa of caixasEmUso) {
        if (this.produtoCabeNaCaixa(produto, caixa.caixaInfo)) {
          if (caixa.volumeOcupado + produto.volume <= caixa.caixaInfo.volume) {
            caixa.produtos.push(produto);
            caixa.volumeOcupado += produto.volume;
            produtoEncaixotado = true;
            break;
          }
        }
      }

      // Se n�o coube em nenhuma caixa aberta, abre uma nova.
      if (!produtoEncaixotado) {
        const novaCaixa = this.encontrarMenorCaixaPossivel(produto);
        if (novaCaixa) {
          caixasEmUso.push({
            caixaInfo: novaCaixa,
            produtos: [produto],
            volumeOcupado: produto.volume,
          });
        } else {
          // "catch" para o erro de nao ter caixas
          return {
            erro: `O produto com dimensões ${produto.altura}x${produto.largura}x${produto.comprimento} não cabe em nenhuma caixa disponível.`,
          };
        }
      }
    }

    // 4. Formata a saída para o formato desejado.
    return this.formatarSaida(caixasEmUso);
  }

  /**
   * Encontra a menor caixa que pode comportar um produto.
   */
  private encontrarMenorCaixaPossivel(produto: Produto): Caixa | null {
    for (const caixa of caixasDisponiveis) {
      if (this.produtoCabeNaCaixa(produto, caixa)) {
        return caixa;
      }
    }
    return null;
  }

  /**
   * verifica se um produto cabe em uma caixa.
   */
  private produtoCabeNaCaixa(produto: Produto, caixa: Caixa): boolean {
    const p = [produto.altura, produto.largura, produto.comprimento].sort(
      (a, b) => a - b,
    );
    const c = [caixa.altura, caixa.largura, caixa.comprimento].sort(
      (a, b) => a - b,
    );
    return p[0] <= c[0] && p[1] <= c[1] && p[2] <= c[2];
  }

  /**
   * Prepara o resultado final no formato JSON especificado.
   */
  private formatarSaida(caixasEmUso: CaixaEmUso[]): any {
    return {
      empacotamento: caixasEmUso.map((caixa, index) => ({
        caixa: `${index + 1} (${caixa.caixaInfo.nome})`,
        produtos: caixa.produtos.map((p) => ({
          altura: p.altura,
          largura: p.largura,
          comprimento: p.comprimento,
        })),
      })),
    };
  }
}
