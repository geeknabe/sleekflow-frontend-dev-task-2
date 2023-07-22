import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';

import { getCharactersGQL } from '../../queries';
import $ from '../../styles/global';
import { addKeys } from '../../helper';
import Row from './Row';
import Dropdown from './Dropdown';
import Loading from '../../components/Loading';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';

const Container = styled.div`
  height: 100%;
`;

const Title = styled.h1`
  font-family: Lato Black;
  font-size: 30px;
  margin-bottom: 30px;
`;

const SearchBarContainer = styled.div`
  position: relative;
  margin-bottom: 10px;

  & > svg {
    position: absolute;
    width: 24px;
    height: 24px;
    left: 6px;
    top: 7px;
    fill: ${$.color.lightblue};
  }
`;

const SearchInput = styled.input`
  /* Width = Full Width of Container - Padding - Border Size */
  width: calc(100% - 10px - 34px - 2px);
  /* Left Padding is for Search Icon */
  padding: 8px 10px 8px 34px;
  outline: none;
  border-radius: 10px;
  line-height: 1.1em;
  border: 1px solid ${$.color.gray2};
`;

const FilterTools = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  background-color: #fff;

  & > *:not(:last-child) {
    margin-right: 5px;
  }

  ${$.device.mobile} {
    flex-wrap: wrap;
    justify-content: space-between;

    & > * {
      &:first-child,
      &:nth-child(2) {
        /* 50% width = (100vw - Container Padding / 2) - Dropdown Padding - Border Size - Margin */
        width: calc(((100vw - 64px) / 2) - 16px - 2px - 5px);
        margin-bottom: 5px;
        margin-right: 0;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

const ClearFilter = styled.div`
  font-size: 15px;

  &:hover {
    cursor: pointer;
  }
`;

const STATUS = 'Status';
const GENDER = 'Gender';

const genderOptions = addKeys([
  { text: 'Female' },
  { text: 'Male' },
  { text: 'Genderless' },
  { text: 'Unknown' },
]);

const statusOptions = addKeys([{ text: 'Alive' }, { text: 'Dead' }, { text: 'Unknown' }]);

const ListAndSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState(GENDER);
  const [statusFilter, setStatusFilter] = useState(STATUS);
  const [characters, setCharacters] = useState([]);
  const [getCharacters, { loading }] = useLazyQuery(getCharactersGQL, {
    onCompleted: ({ characters: { results } }) => {
      setCharacters([...characters, ...addKeys(results)]);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    getCharacters({ variables: { page: 10 } });
  }, []);

  return (
    <Container>
      <Title>Contact</Title>
      <SearchBarContainer>
        <SearchIcon />
        <SearchInput
          value={searchTerm || ''}
          placeholder='Search Characters'
          onChange={(e) => {
            const val = e.target.value;

            setSearchTerm(val);
          }}
        />
      </SearchBarContainer>
      <FilterTools>
        <Dropdown
          key={`${STATUS}_dropdown`}
          filterText={STATUS}
          activeFilter={statusFilter}
          setActiveFilter={setStatusFilter}
          options={statusOptions}
        />
        <Dropdown
          key={`${GENDER}_dropdown`}
          filterText={GENDER}
          activeFilter={genderFilter}
          setActiveFilter={setGenderFilter}
          options={genderOptions}
        />

        {statusFilter !== STATUS || genderFilter !== GENDER ? (
          <ClearFilter
            onClick={() => {
              setStatusFilter(STATUS);
              setGenderFilter(GENDER);
            }}
          >
            Clear Filter
          </ClearFilter>
        ) : (
          ''
        )}
      </FilterTools>
      <div>
        {loading ? (
          <Loading />
        ) : (
          characters
            .filter(({ name, gender, status }) => {
              const filterName = name
                ? name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
                : true;
              const filterGender = genderFilter !== GENDER ? gender === genderFilter : true;
              const filterStatus = statusFilter !== STATUS ? status === statusFilter : true;

              return filterName && filterGender && filterStatus;
            })
            .map(({ name, image, species, id, key }) => {
              return <Row id={id} key={key} name={name} image={image} species={species} />;
            })
        )}
      </div>
    </Container>
  );
};

export default ListAndSearch;
