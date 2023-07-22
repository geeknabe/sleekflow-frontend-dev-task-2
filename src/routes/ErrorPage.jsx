import styled from 'styled-components';
import { useRouteError } from 'react-router-dom';

const Container = styled.div;

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Container>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
};

export default ErrorPage;
