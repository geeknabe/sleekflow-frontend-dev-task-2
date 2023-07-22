import { useState, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import $ from '../../styles/global';
import RotatingDownChevron from './RotatingDownChevron';
import { useOutsideClick } from '../../helper';

const Container = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid ${$.color.gray2};
  padding: 4px 8px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 100px;

  & > span {
    font-size: 15px;
  }
`;

const List = styled.div`
  pointer-events: none;
  opacity: 0;
  position: absolute;
  top: 35px;
  left: 0;
  z-index: 1;
  border: 1px solid ${$.color.gray2};
  background-color: #fff;
  padding: 10px 8px;
  border-radius: 10px;
  /* Width = Full Width - Padding - Border Size */
  width: calc(100% - 16px - 2px);

  &.show {
    opacity: 1;
    pointer-events: initial;
  }

  & > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:hover {
      cursor: pointer;
    }

    & > input {
      pointer-events: none;
    }
  }

  ${$.device.mobile} {
    & > div {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
`;

const Dropdown = ({ activeFilter, setActiveFilter, filterText, options }) => {
  const [counter, setCounter] = useState(0);
  const [dropdownState, setDropdownState] = useState(false);
  const containerRef = useRef(null);

  useOutsideClick([containerRef], () => {
    setDropdownState((prev) => {
      if (prev === true) {
        setCounter((prevCounter) => prevCounter + 1);
        return false;
      }

      return prev;
    });
  });

  return (
    <Container ref={containerRef}>
      <Text
        onClick={() => {
          setDropdownState((prev) => !prev);
          setCounter((prev) => prev + 1);
        }}
      >
        <span>{activeFilter}</span>
        <RotatingDownChevron counter={counter} />
      </Text>
      <List className={dropdownState ? 'show' : ''}>
        {options.map(({ text, key }) => {
          return (
            <div
              key={key}
              onClick={() => {
                setActiveFilter(text);
              }}
            >
              <span>{text}</span>
              <input type='radio' readOnly name={filterText} checked={activeFilter === text} />
            </div>
          );
        })}
      </List>
    </Container>
  );
};

Dropdown.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
  filterText: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.string,
      key: PropTypes.string,
    }),
  ).isRequired,
};

export default Dropdown;
