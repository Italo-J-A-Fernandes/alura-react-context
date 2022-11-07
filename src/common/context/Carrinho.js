import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [quantidadeProduto, setQuantidadeProduto] = useState(0);

  return (
    <CarrinhoContext.Provider
      value={{ carrinho, quantidadeProduto, setCarrinho, setQuantidadeProduto }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const { carrinho, quantidadeProduto, setCarrinho, setQuantidadeProduto } =
    useContext(CarrinhoContext);

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

  useEffect(() => {
    const novaQuantidade = carrinho.reduce(
      (contador, produto) => contador + produto.quantidade,
      0
    );
    setQuantidadeProduto(novaQuantidade);
  }, [carrinho, setQuantidadeProduto]);

  return {
    carrinho,
    setCarrinho,
    addProduto,
    removerProduto,
    quantidadeProduto,
    setQuantidadeProduto,
  };
};
