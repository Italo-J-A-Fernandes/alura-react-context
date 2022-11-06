import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho';

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);

  return (
    <CarrinhoContext.Provider value={{ carrinho, setCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  const addProduto = (produto) => {
    const temNoCarrinho = carrinho.some(
      (itemCarrinho) => itemCarrinho.id === produto.id
    );
    if (!temNoCarrinho) {
      produto.quantidade = 1;
      return setCarrinho(() => [...carrinho, produto]);
    }
    setCarrinho(() =>
      carrinho.map((itemCarrinho) => {
        if (itemCarrinho.id === produto.id) itemCarrinho.quantidade += 1;
        return itemCarrinho;
      })
    );
  };

  const removerProduto = (id) => {
    const produto = carrinho.find(
      (itemDoCarrinhho) => itemDoCarrinhho.id === id
    );
    const ehOUltimo = produto.quantidade === 1;

    if (ehOUltimo) {
      return setCarrinho((carrinhoAnterior) =>
        carrinhoAnterior.filter((itemDoCarrinhho) => itemDoCarrinhho.id !== id)
      );
    }
  };

  return {
    carrinho,
    setCarrinho,
    addProduto,
    removerProduto,
  };
};
