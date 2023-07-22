import { gql } from 'apollo-boost';

const getCharacterGQL = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      status
      name
      gender
      species
      image
      location {
        name
      }
      origin {
        name
      }
      created
      episode {
        name
        air_date
        episode
        created
      }
    }
  }
`;

export default getCharacterGQL;
