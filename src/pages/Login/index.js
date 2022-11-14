import { Button, Input, InputLabel, InputAdornment } from '@material-ui/core';
import { Container, Titulo, InputContainer } from './styles';

import { useHistory } from 'react-router-dom';
import { UsuarioContext } from '../../common/context/Usuario';
import { useContext } from 'react';

function Login() {
  const history = useHistory();
  const { nome, saldo, setNome, setSaldo } = useContext(UsuarioContext);
  return (
    <Container>
      <Titulo>Insira o seu nome</Titulo>
      <InputContainer>
        <InputLabel>Nome</InputLabel>
        <Input
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>Saldo</InputLabel>
        <Input
          type="number"
          startAdornment={<InputAdornment position="start">R$</InputAdornment>}
          value={saldo}
          onChange={(e) => setSaldo(Number(e.target.value))}
        />
      </InputContainer>
      <Button
        disabled={nome.length < 3}
        variant="contained"
        color="primary"
        onClick={() => history.push('/feira')}
      >
        Avançar
      </Button>
    </Container>
  );
}

export default Login;
