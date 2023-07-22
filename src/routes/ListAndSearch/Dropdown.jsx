import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import $ from '../../styles/global';

const Container = styled.div`
  display: inline-block;
  position: relative;
  border: 1px solid ${$.color.gray2};
  padding: 4px 8px;
  border-radius: 10px;
  min-width: 80px;
`;

const Text = styled.div``;

const List = styled.div`
  pointer-events: none;
  opacity: 0;
  position: absolute;
  top: 35px;
  left: 0;
  border: 1px solid ${$.color.gray2};
  background-color: #fff;
  padding: 4px 8px;
  border-radius: 10px;
  width: calc(100% - 8px - 8px - 1px - 1px);

  &.show {
    opacity: 1;
    pointer-events: initial;
  }
`;

const Dropdown = ({ activeFilter, setActiveFilter, filterText, options }) => {
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <Container>
      <Text
        onClick={() => {
          setDropdownState((prev) => !prev);
        }}
      >
        {activeFilter}
      </Text>
      <List className={dropdownState ? 'show' : ''}>
        {options.map(({ text, key }) => {
          return (
            <div key={key}>
              <span>{text}</span>
              <input
                type='radio'
                name={filterText}
                checked={activeFilter === text}
                onClick={(res) => {
                  setActiveFilter((prev) => {
                    return res.target.checked && prev !== text ? text : filterText;
                  });
                }}
              />
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
