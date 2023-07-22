import styled from 'styled-components';
import { Outlet, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import $ from '../styles/global';
import RickAndMortyLogo from '../assets/images/rick-and-morty-logo.png';
import { ReactComponent as ContactsIcon } from '../assets/icons/contacts.svg';
import BackToTop from '../components/BackToTop';

const Section = styled.section`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  min-height: 100vh;
  height: 100%;

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
    width: 100%;
  }

  ${$.device.mobile} {
    flex-direction: column;
    align-items: center;
    width: 100%;

    & a {
      font-size: 15px;
    }
  }
`;

const SideBar = styled.div`
  background-color: ${$.color.gray1};
  padding: 32px;
  align-self: stretch;

  & a {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1px;

    & svg {
      width: 24px;
      height: 24px;
      fill: ${$.color.lightblue};
      margin-right: 5px;
    }
  }

  ${$.device.desktop} {
    width: calc(30% - 64px);
  }

  ${$.device.tablet} {
    width: calc(30% - 64px);
  }

  ${$.device.mobile} {
    padding: 10px 32px;
    width: calc(100% - 64px);
    height: calc(50px - 10px - 10px);
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 3px 8px rgb(0, 0, 0, 0.15);

    & a {
      & span {
        display: none;
      }
      & svg {
        margin-right: 0;
      }
    }
  }
`;

const Content = styled.div`
  padding: 32px;
  align-self: stretch;

  ${$.device.desktop} {
    width: calc(70% - 64px);
  }

  ${$.device.tablet} {
    width: calc(70% - 64px);
  }

  ${$.device.mobile} {
    width: calc(100% - 64px);
  }
`;

const LogoContainer = styled(Link)`
  display: block;
  margin: 0 auto 30px auto;
  width: 100%;

  & > img {
    width: 100%;
    height: 100%;
  }

  ${$.device.desktop} {
    max-width: 200px;
  }

  ${$.device.tablet} {
    max-width: 150px;
  }

  ${$.device.mobile} {
    max-width: 100px;
    margin: 0;
  }
`;

const Root = () => {
  return (
    <>
      <Helmet>
        <title>Rick and Morty Contact Page</title>
      </Helmet>
      <Section>
        <SideBar>
          <LogoContainer to='/' title='Go to Home'>
            <img src={RickAndMortyLogo} alt='Rick and Morty logo' />
          </LogoContainer>
          <Link to='/contact' title='Go to Contact'>
            <ContactsIcon />
            <span>Contact</span>
          </Link>
        </SideBar>
        <Content>
          <Outlet />
        </Content>
        <BackToTop />
      </Section>
    </>
  );
};

export default Root;
