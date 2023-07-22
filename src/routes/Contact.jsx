import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';

import { getCharacterGQL } from '../queries';
import { addKeys } from '../helper';
import $ from '../styles/global';
import Loading from '../components/Loading';

const Header = styled.div`
  border-bottom: 1px solid ${$.color.gray2};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 30px;
`;

const ProfilePic = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  overflow: hidden;
  margin-right: 20px;

  & > img {
    width: 100%;
    height: 100%;
  }

  ${$.device.mobile} {
    width: 100px;
    height: 100px;
    align-self: flex-start;
  }
`;

const Name = styled.h1`
  font-family: Lato Black;
  color: ${$.color.lightblue};
  font-size: 40px;
  /* Width = Full Width - Profile Pic Size */
  width: calc(100% - 200px);

  ${$.device.mobile} {
    font-size: 30px;
    width: calc(100% - 100px);
    word-break: break-word;
  }
`;

const SectionTitle = styled.h2`
  font-family: Lato Black;
  font-size: 20px;
  margin-bottom: 20px;
`;

const PersonalInfo = styled.div`
  margin-bottom: 40px;

  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > span {
    display: block;

    &:first-child {
      width: 30%;
      text-transform: uppercase;
      font-family: Lato Black;
      font-size: 15px;
      letter-spacing: 1px;
      color: ${$.color.lightblue};
    }
    &:last-child {
      width: 70%;
      align-self: flex-start;
      font-size: 15px;
    }
  }

  ${$.device.mobile} {
    & > span {
      display: block;

      &:first-child {
        width: 50%;
      }
      &:last-child {
        width: 50%;
      }
    }
  }
`;

const TableContainer = styled.div`
  overflow: scroll;
`;

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid ${$.color.greenlime};
  width: 100%;

  td {
    padding: 10px;
  }

  thead {
    tr {
      background-color: ${$.color.greenlime};
      text-transform: uppercase;
      font-family: Lato Black;
      td {
        &:not(:last-child) {
          border-right: 1px solid #fff;
        }
      }
    }
  }

  tbody {
    tr {
      td {
        vertical-align: top;
        border-bottom: 1px solid ${$.color.greenlime};
        &:not(:last-child) {
          border-right: 1px solid ${$.color.greenlime};
        }
      }
    }
  }
`;

const Contact = () => {
  const { pathname } = useLocation();
  const [characterDetails, setCharacterDetails] = useState({});
  const [getCharacter, { loading }] = useLazyQuery(getCharacterGQL, {
    onCompleted: ({ character }) => {
      if (character) {
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
    return (
      <div>Looks like the character does not exist. Please try again with other characters.</div>
    );
  }

  if (loading) {
    return <Loading />;
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
        <InfoRow>
          <span>Status</span>
          <span>{characterDetails.status}</span>
        </InfoRow>
        <InfoRow>
          <span>Gender</span>
          <span>{characterDetails.gender}</span>
        </InfoRow>
        <InfoRow>
          <span>Species</span>
          <span>{characterDetails.species}</span>
        </InfoRow>
        <InfoRow>
          <span>Location</span>
          <span>{characterDetails.location?.name}</span>
        </InfoRow>
        <InfoRow>
          <span>Origin</span>
          <span>{characterDetails.origin?.name}</span>
        </InfoRow>
        <InfoRow>
          <span>Created Date</span>
          <span>
            {new Date(characterDetails.created).toLocaleDateString('en-US', {
              timeZone: 'Asia/Hong_Kong',
            })}
          </span>
        </InfoRow>
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
                  <td>
                    {new Date(created).toLocaleDateString('en-US', {
                      timeZone: 'Asia/Hong_Kong',
                    })}
                  </td>
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
