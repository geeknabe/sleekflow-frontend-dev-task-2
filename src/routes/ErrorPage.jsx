import styled from 'styled-components';
import { useRouteError } from 'react-router-dom';

import $ from '../styles/global';

const Section = styled.section`
  min-height: 100vh;
  height: 100%;
  margin: auto;

  ${$.device.desktop} {
    width: 970px;
  }

  ${$.device.tablet} {
    width: calc(100% - 64px);
  }

  ${$.device.mobile} {
    width: calc(100% - 64px);
  }
`;

const Container = styled.div`
  padding: 15px 0;
`;

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Section>
      <Container>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </Container>
    </Section>
  );
};

export default ErrorPage;
