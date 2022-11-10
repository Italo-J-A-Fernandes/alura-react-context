import { createContext, useContext, useState } from 'react';

export const PagamentoContext = createContext();
PagamentoContext.displayName = 'Pagamento';

export const PagamentoProvider = ({ children }) => {
  const tiposPagamento = [
    {
      name: 'Boleto',
      juros: 1,
      id: 1,
    },
    {
      name: 'Cartão de Crédito',
      juros: 1.3,
      id: 2,
    },
    {
      name: 'PIX',
      juros: 1,
      id: 3,
    },
    {
      name: 'Crediário',
      juros: 1.5,
      id: 4,
    },
  ];
  const [formaPagamento, setFormaPagamento] = useState(tiposPagamento[0]);
  return (
    <PagamentoContext.Provider
      value={{ tiposPagamento, formaPagamento, setFormaPagamento }}
    >
      {children}
    </PagamentoContext.Provider>
  );
};

export const usePagamentoContext = () => {
  const { tiposPagamento, formaPagamento, setFormaPagamento } =
    useContext(PagamentoContext);

  const mudarFormaPagamento = (id) => {
    const formaPagamentoSelecionado = tiposPagamento.find(
      (tipoPaga) => tipoPaga.id === id
    );
    setFormaPagamento(formaPagamentoSelecionado);
  };

  return { tiposPagamento, formaPagamento, mudarFormaPagamento };
};
