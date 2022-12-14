import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { usePagamentoContext } from './Pagamento';
import { UsuarioContext } from './Usuario';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProduto, setQuantidadeProduto] = useState(0);
  const [valorTotalCarrinho, setValorTotalCarrinho] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        quantidadeProduto,
        valorTotalCarrinho,
        setCarrinho,
        setQuantidadeProduto,
        setValorTotalCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const {
    carrinho,
    quantidadeProduto,
    valorTotalCarrinho,
    setCarrinho,
    setQuantidadeProduto,
    setValorTotalCarrinho,
  } = useContext(CarrinhoContext);

  const { formaPagamento } = usePagamentoContext();

  const { setSaldo } = useContext(UsuarioContext);

  const mudarQuantidade = (id, quantidade) => {
    return carrinho.map((itemDoCarrinhho) => {
      if (itemDoCarrinhho.id === id) {
        itemDoCarrinhho.quantidade += quantidade;
      }
      return itemDoCarrinhho;
    });
  };

  const addProduto = (produto) => {
    const temNoCarrinho = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === produto.id
    );
    if (!temNoCarrinho) {
      produto.quantidade = 1;
      return setCarrinho(() => [...carrinho, produto]);
    }
    setCarrinho(mudarQuantidade(produto.id, 1));
  };

  const removerProduto = (id) => {
    const produto = carrinho.find(
      (itemDoCarrinhho) => itemDoCarrinhho.id === id
    );
    const ehOUltimo = produto && produto.quantidade === 1;

    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinhho) => itemDoCarrinhho.id !== id)
      );
    }
    setCarrinho(mudarQuantidade(id, -1));
  };

  const efetuarCompra = () => {
    setCarrinho([]);
    setSaldo((saldoAtual) => saldoAtual - valorTotalCarrinho);
  };

  useEffect(() => {
    const { novoTotal, novaQuantidade } = carrinho.reduce(
      (contador, produto) => ({
        novaQuantidade: contador.novaQuantidade + produto.quantidade,
        novoTotal: contador.novoTotal + produto.valor * produto.quantidade,
      }),
      {
        novaQuantidade: 0,
        novoTotal: 0,
      }
    );
    setQuantidadeProduto(novaQuantidade);
    setValorTotalCarrinho(novoTotal * formaPagamento.juros);
  }, [carrinho, setQuantidadeProduto, setValorTotalCarrinho, formaPagamento]);

  return {
    carrinho,
    setCarrinho,
    addProduto,
    removerProduto,
    quantidadeProduto,
    valorTotalCarrinho,
    efetuarCompra,
    setQuantidadeProduto,
  };
};
