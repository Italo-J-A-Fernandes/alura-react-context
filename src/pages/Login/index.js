import { Button, Input, InputLabel, InputAdornment } from '@material-ui/core';
import { Container, Titulo, InputContainer } from './styles';

import { useHistory } from 'react-router-dom';

function Login({ nome, saldo, setNome, setSaldo }) {
  const history = useHistory();
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
          onChange={(e) => setSaldo(e.target.value)}
        />
      </InputContainer>
      <Button
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
