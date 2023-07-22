import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const NotFound = () => {
  return (
    <Section>
      <Container>
        <h1>Oops!</h1>
        <p>
          Sorry, you visited a page that doesn&apos;t exist. Head back <Link to='/'>home</Link>.
        </p>
      </Container>
    </Section>
  );
};

export default NotFound;
