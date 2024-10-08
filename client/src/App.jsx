import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation, Navigate  } from 'react-router-dom';


import Header from './components/Header';
import Footer from './components/Footer';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  const currentPage = location.pathname;
  const isAuthenticated = !!localStorage.getItem('id_token');

  return (
    <ApolloProvider client={client}>
      <div id="main-bg" className="flex-column justify-flex-start min-100-vh">
        {/* The Header will not render if the current page is '/Login' */}
        <div className="container">
          {/* NEED TO MAKE A NEW LANDING PAGE TO SIGN IN IF USER ISN'T THERE */}
        {!isAuthenticated && currentPage !== '/login' && currentPage !== '/signup'  && <Navigate to="/landingpage" />}
          <Outlet />
        </div>
        {currentPage !== '/login' && currentPage !== '/signup' && currentPage !== '/landingpage' && <Footer />}
      </div>
    </ApolloProvider>
  );
}

export default App;
