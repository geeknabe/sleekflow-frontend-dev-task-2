import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import $ from '../../styles/global';
import { ReactComponent as VisibilityIcon } from '../../assets/icons/visibility.svg';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  & > svg {
    width: 32px;
    height: 32px;
    fill: #fff;
  }
`;

const Container = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid ${$.color.gray2};
  padding: 10px 0;

  &:hover {
    ${Overlay} {
      opacity: 0.5;
    }
  }
`;

const ProfilePic = styled.div`
  overflow: hidden;
  border-radius: 999px;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  position: relative;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Info = styled.div`
  /* width = Full Width - Profile Pic Width - Profile Pic Margin Right */
  width: calc(100% - 60px - 10px);
`;

const Name = styled.div`
  font-size: 19px;
  line-height: 1.1em;
  font-family: Lato Black;
`;

const Species = styled.div`
  font-size: 15px;
  line-height: 1.1em;
  color: ${$.color.greenlime};
  font-family: Lato Regular;
`;

const Row = ({ name, image, species, id }) => {
  return (
    <Container to={`/contact/${id}`} title={`Go to ${name}'s contact page`}>
      <ProfilePic>
        <Overlay>
          <VisibilityIcon />
        </Overlay>
        <img src={image} alt={`${name} profile picture`} />
      </ProfilePic>
      <Info>
        <Name>{name}</Name>
        <Species>{species}</Species>
      </Info>
    </Container>
  );
};

Row.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
};

export default Row;
