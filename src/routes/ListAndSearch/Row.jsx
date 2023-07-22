import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;

const ProfilePic = styled.div`
  overflow: hidden;
  border-radius: 999px;
  width: 100px;
  height: 100px;
  margin-right: 10px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Info = styled.div`
  width: calc(100% - 100px - 10px);
`;

const Name = styled.div``;

const Species = styled.div``;

const Row = ({ name, image, species }) => {
  return (
    <Container>
      <ProfilePic>
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
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
};

export default Row;
