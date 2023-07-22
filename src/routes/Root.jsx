import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';

import $ from '../styles/global';
import RickAndMortyLogo from '../assets/images/rick-and-morty-logo.png';

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;

  & a {
    font-size: 17px;
    color: ${$.color.lightblue};
    &:visited {
      color: ${$.color.lightblue};
    }
  }

  ${$.device.desktop} {
    width: 970px;
    margin: auto;
  }

  ${$.device.tablet} {
    width: calc(100% - 64px);
    margin: 0 32px;
  }

  ${$.device.mobile} {
    width: calc(100% - 64px);
    margin: 0 32px;
  }
`;

const SideBar = styled.div`
  width: calc(40% - 64px);
  height: calc(100% - 64px);
  background-color: #f7f7f7;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: calc(60% - 64px);
  height: calc(100% - 64px);
  padding: 32px;
`;

const LogoContainer = styled(Link)`
  width: 200px;
  display: block;
  margin-bottom: 30px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Root = () => {
  return (
    <Section>
      <SideBar>
        <LogoContainer to='/'>
          <img src={RickAndMortyLogo} alt='Rick and Morty logo' />
        </LogoContainer>
        <Link to='/contact'>Contact</Link>
        <Link to='/contact/2'>Contact 2</Link>
      </SideBar>
      <Content>
        <Outlet />
      </Content>
    </Section>
  );
};

export default Root;
