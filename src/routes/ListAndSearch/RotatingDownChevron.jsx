import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ReactComponent as DownChevronIcon } from '../../assets/icons/down-chevron.svg';
import $ from '../../styles/global';

const StyledDownChevron = styled(DownChevronIcon)`
  transform: rotate(${({ counter }) => counter * 180}deg);
  transition: transform 0.5s ease;
  height: 24px;
  width: 24px;
  position: relative;
  top: 2px;
  fill: ${$.color.lightblue};
`;

const RotatingDownChevron = ({ counter, className }) => (
  <StyledDownChevron className={className} counter={counter} />
);

RotatingDownChevron.defaultProps = {
  counter: 0,
  className: '',
};

RotatingDownChevron.propTypes = {
  counter: PropTypes.number,
  className: PropTypes.string,
};

export default RotatingDownChevron;
