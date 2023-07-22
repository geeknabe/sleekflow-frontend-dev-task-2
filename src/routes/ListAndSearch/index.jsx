import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';

import { getCharactersGQL } from '../../queries';
import { addKeys } from '../../helper';
import Row from './Row';
import Dropdown from './Dropdown';

const Container = styled.div`
  height: 100%;
`;

const SearchInput = styled.input`
  width: calc(100% - 10px - 10px - 2px);
  height: 30px;
  padding: 5px 10px;
  margin-bottom: 20px;
  outline: none;
`;

const CharacterList = styled.div`
  overflow: scroll;
  height: calc(100% - 30px - 20px - 2px);
`;

const Message = styled.div``;

const ClearFilterButton = styled.div``;

const STATUS = 'Status';
const GENDER = 'Gender';

const ListAndSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState(GENDER);
  const [statusFilter, setStatusFilter] = useState(STATUS);
  const [characters, setCharacters] = useState([]);
  const [getCharacters, { loading }] = useLazyQuery(getCharactersGQL, {
    onCompleted: ({ characters: { results } }) => {
      setCharacters(addKeys(results));
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    getCharacters({ variables: { page: 1 } });
  }, []);

  return (
    <Container>
      <SearchInput
        value={searchTerm || ''}
        onChange={(e) => {
          const val = e.target.value;

          setSearchTerm(val);
        }}
      />
      <Dropdown
        filterText={GENDER}
        activeFilter={genderFilter}
        setActiveFilter={setGenderFilter}
        options={addKeys([
          { text: 'Female' },
          { text: 'Male' },
          { text: 'Genderless' },
          { text: 'Unknown' },
        ])}
      />
      <Dropdown
        filterText={STATUS}
        activeFilter={statusFilter}
        setActiveFilter={setStatusFilter}
        options={addKeys([{ text: 'Alive' }, { text: 'Dead' }, { text: 'Unknown' }])}
      />
      <ClearFilterButton
        onClick={() => {
          setStatusFilter(STATUS);
          setGenderFilter(GENDER);
          setSearchTerm('');
        }}
      >
        Clear Filter
      </ClearFilterButton>
      <CharacterList>
        {loading && <Message>Loading...</Message>}
        {characters
          .filter(({ name, gender, status }) => {
            const filterName = name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
            const filterGender = genderFilter !== 'Gender' ? gender === genderFilter : true;
            const filterStatus = statusFilter !== 'Status' ? status === statusFilter : true;

            return filterName && filterGender && filterStatus;
          })
          .map(({ name, image, species, key }) => {
            return <Row key={key} name={name} image={image} species={species} />;
          })}
      </CharacterList>
    </Container>
  );
};

export default ListAndSearch;
