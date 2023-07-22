import styled from 'styled-components';

const Container = styled.div``;

const NotFound = () => {
  return (
    <Container>
      <h1>Oops!</h1>
      <p>Sorry, you visited a page that doesn&apos;t exist.</p>
    </Container>
  );
};

export default NotFound;
