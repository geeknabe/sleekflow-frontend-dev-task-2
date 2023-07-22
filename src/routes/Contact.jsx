import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import { getCharacterGQL } from '../queries';
import { addKeys } from '../helper';

const Header = styled.div``;

const ProfilePic = styled.div`
  width: 200px;
  height: 200px;

  & > img {
    width: 100%;
    height: 100%;
  }
`;

const Name = styled.h1``;

const SectionTitle = styled.h2``;

const PersonalInfo = styled.div``;

const TableContainer = styled.div``;

const Table = styled.table``;

const Contact = () => {
  const { pathname } = useLocation();
  const [characterDetails, setCharacterDetails] = useState({});
  const [getCharacter] = useLazyQuery(getCharacterGQL, {
    onCompleted: ({ character }) => {
      if (character) {
        console.log(character);
        setCharacterDetails({ ...character, episode: addKeys(character.episode) });
      }
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    const id = Number(pathname.split('/')[2]);

    if (id) {
      getCharacter({ variables: { id } });
    } else {
      setCharacterDetails({ error: true });
    }
  }, []);

  if (characterDetails.error) {
    return <div>An error occurred.</div>;
  }

  return (
    <>
      <Header>
        <ProfilePic>
          <img src={characterDetails.image} />
        </ProfilePic>
        <Name>{characterDetails.name}</Name>
      </Header>
      <SectionTitle>Personal Info</SectionTitle>
      <PersonalInfo>
        <div>{characterDetails.status}</div>
        <div>{characterDetails.gender}</div>
        <div>{characterDetails.species}</div>
        <div>{characterDetails.location?.name}</div>
        <div>{characterDetails.origin?.name}</div>
        <div>{characterDetails.created}</div>
      </PersonalInfo>
      <SectionTitle>Episodes</SectionTitle>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Air Date</td>
              <td>Episode</td>
              <td>Created Date</td>
            </tr>
          </thead>
          <tbody>
            {characterDetails?.episode?.map(({ key, name, air_date: aired, episode, created }) => {
              return (
                <tr key={key}>
                  <td>{name}</td>
                  <td>{aired}</td>
                  <td>{episode}</td>
                  <td>{created}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Contact;
