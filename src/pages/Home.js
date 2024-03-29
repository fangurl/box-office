import React, { useState, useCallback } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import { RadioInputsWrapper, SearchButtonWrapper, SearchInput } from './Home.styled';
import CustomRadio from '../components/customRadio';

const renderResults = (results) => {
    if (results && results.length === 0) {
      return <div> No results found </div>
    }

    if (results && results.length > 0) {
      return results[0].show ? <ShowGrid data={results} />
        : <ActorGrid data={results} />
    }
     
    return null;
  }

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOPtion] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    })
  
  };

  const onInputChange = useCallback( ev => {
    setInput(ev.target.value);
  }, [setInput]);

  const onKeyDown = ev => {
    if(ev.keyCode === 13){
      onSearch()
    }
  };

  const onRadioChange = useCallback(ev => {
    setSearchOPtion(ev.target.value)  
  }, []); 

  
  return (
    <MainPageLayout>

      <SearchInput type = "text"
        placeholder="Type your search here"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
        />

        <RadioInputsWrapper>
          <div>
            <CustomRadio 
             label = "Shows"
             id ="show-search"
             value="shows"
             checked={isShowsSearch}
             onChange={onRadioChange} 
            />
          </div>
        
        <div>
          <CustomRadio 
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowsSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>

      <SearchButtonWrapper>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      </SearchButtonWrapper>
      {renderResults(results)}
    </MainPageLayout>
  );
};

export default Home;
