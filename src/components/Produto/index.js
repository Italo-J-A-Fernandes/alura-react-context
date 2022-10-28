import { Container } from './styles';
import { memo } from 'react';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCarrinhoContext } from '../../common/context/Carrinho';

function Produto({ nome, foto, valor, id }) {
  const { carrinho, addProduto } = useCarrinhoContext();
  const produtoNoCarrinho = carrinho.find(
    (itemDoCarrinho) => itemDoCarrinho.id === id
  );

  return (
    <Container>
      <div>
        <img src={`/assets/${foto}.png`} alt={`foto de ${nome}`} />
        <p>
          {nome} - R$ {valor?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
        <IconButton color="secondary">
          <RemoveIcon />
        </IconButton>
        {produtoNoCarrinho?.quantidade ?? 0}
        <IconButton onClick={() => addProduto({ nome, foto, valor, id })}>
          <AddIcon />
        </IconButton>
      </div>
    </Container>
  );
}

export default memo(Produto);
