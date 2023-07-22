import styled from 'styled-components';
import RickAndMortyPortal from '../assets/images/rick-and-morty-portal.png';
import { Link } from 'react-router-dom';

import $ from '../styles/global';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > img {
    width: 70%;
  }
`;

const Message = styled.h2`
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: ${$.color.greenlime};
`;

const GetStarted = () => {
  return (
    <Container>
      <Message>
        Click on <Link to='/contact'>Contact</Link> to get started!
      </Message>
      <img src={RickAndMortyPortal} alt='Rick and Morty portal' />
    </Container>
  );
};

export default GetStarted;
