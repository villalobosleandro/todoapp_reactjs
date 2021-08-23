import './App.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

import {Home} from './pages/home';
import {Login} from './pages/login';
import {Register} from './pages/register'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoutes'

const endpoint = 'https://api.8base.com/ckn3vx13501vs07l7ba9q36jw';
const token = 'c7c9dfd2-3a75-4196-9be8-f996ad762d13';
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${token}`
  }
});


function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </Switch>
        </AuthProvider>
      </BrowserRouter>

    </ApolloProvider>
  );
}

export default App;
