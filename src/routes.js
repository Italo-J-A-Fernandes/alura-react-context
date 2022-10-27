import Feira from './pages/Feira';
import Login from './pages/Login';
import Carrinho from './pages/Carrinho';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { UsuarioContext } from './common/context/Usuario';

const Router = () => {
  const [nome, setNome] = useState('');
  const [saldo, setSaldo] = useState(0);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <UsuarioContext.Provider value={{ nome, saldo, setNome, setSaldo }}>
            <Login />
          </UsuarioContext.Provider>
        </Route>
        <Route path="/feira">
          <Feira
            nome={nome}
            setNome={setNome}
            saldo={saldo}
            setSaldo={setSaldo}
          />
        </Route>
        <Route path="/carrinho">
          <Carrinho />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
