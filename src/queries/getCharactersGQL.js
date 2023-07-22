import { gql } from 'apollo-boost';

const getCharactersGQL = gql`
  query getCharacters($page: Int!) {
    characters(page: $page) {
      results {
        id
        name
        image
        species
        gender
        status
      }
    }
  }
`;

export default getCharactersGQL;
