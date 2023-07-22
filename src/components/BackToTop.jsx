import { useEffect, useState } from 'react';
import styled from 'styled-components';

import $ from '../styles/global';
import { ReactComponent as UpArrowIcon } from '../assets/icons/up-arrow.svg';

const Container = styled.div`
  opacity: 0;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  outline: none;
  background-color: ${$.color.greenlime};
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  transition: opacity 0.5s ease;

  &.show {
    opacity: 1;
  }
`;

const BackToTop = () => {
  const [buttonState, setButtonState] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onscroll = () => {
        const scrolledPastPx = 30;
        setButtonState(
          document.body.scrollTop > scrolledPastPx ||
            document.documentElement.scrollTop > scrolledPastPx,
        );
      };
    }
  }, []);

  return (
    <Container
      className={buttonState ? 'show' : ''}
      onClick={() => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    >
      <UpArrowIcon />
    </Container>
  );
};

export default BackToTop;
