import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

import './styles/reset.css';
import './styles/global.css';
import './styles/fonts.css';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Contact from './routes/Contact';
import ListAndSearch from './routes/ListAndSearch';
import GetStarted from './components/GetStarted';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <GetStarted />,
      },
      {
        path: 'contact/',
        element: <ListAndSearch />,
      },
      {
        path: 'contact/:contactId',
        element: <Contact />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

const httpLink = new HttpLink({
  uri: 'https://rickandmortyapi.com/graphql',
});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  link: httpLink,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

root.render(
  <StrictMode>
    <ApolloProvider client={apolloClient}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
