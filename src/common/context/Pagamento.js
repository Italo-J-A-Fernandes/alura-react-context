import { createContext, useState } from 'react';

export const PagamentoContexto = createContext();
PagamentoContexto.displayName = 'Pagamento';

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
  const [formasPagamento, setFormasPagamento] = useState(tiposPagamento[0]);
  return (
    <PagamentoContexto.Provider
      value={{ tiposPagamento, formasPagamento, setFormasPagamento }}
    >
      {children}
    </PagamentoContexto.Provider>
  );
};
