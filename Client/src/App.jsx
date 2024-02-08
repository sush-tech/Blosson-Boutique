import { Outlet } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ResponsiveAppBar from './components/AppBar';
import Nav from './components/Nav';
// import Menu from './components/Menu';
import { StoreProvider } from './utils/GlobalState';
// import ToggleColorMode from './components/DarkMode';


const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <StoreProvider>
        <ResponsiveAppBar> </ResponsiveAppBar>
          <Nav /> 
          {/* <DarkMode />//Todo: similar to store provider you gotta implement this */}
          {/* <APPBAR /> Todo: this should come under if condiiton for logged in */}
          <Outlet />
        </StoreProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;