import styled from 'styled-components';
import $ from '../styles/global';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Loader = styled.div`
  border: 5px solid ${$.color.gray1};
  border-radius: 999px;
  border-top: 5px solid ${$.color.lightblue};
  width: 15px;
  height: 15px;
  margin-right: 10px;
  animation: spinner 2s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = () => (
  <Container>
    <Loader />
    <span>Loading...</span>
  </Container>
);

export default Loading;
