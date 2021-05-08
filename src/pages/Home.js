import React, { useState } from 'react';
import ActorGrid from '../components/actors/ActorGrid';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/shows/ShowGrid';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOPtion] = useState('shows');

  const isShowsSearch = searchOption === 'shows';

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result => {
      setResults(result);
    })
  
  };

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onKeyDown = ev => {
    if(ev.keyCode === 13){
      onSearch()
    }
  };

  const onRadioChange = ev => {
    setSearchOPtion(ev.target.value)  
  }

  const renderResults = () => {
    if (results && results.length === 0) {
      return <div> No results found </div>
    }

    if (results && results.length > 0) {
      return results[0].show ? <ShowGrid data={results} />
        : <ActorGrid data={results} />
    }
     
    return null;
  }
  return (
    <MainPageLayout>
      <input type="text" placeholder="Search here" 
      onChange={onInputChange}
      onKeyDown={onKeyDown} value={input} />

      <div>
        <label htmlFor="shows-search" >
          SHOWS
          <input
          id ="show-search"
          type="radio"
          value="shows"
          checked={isShowsSearch}
          onChange={onRadioChange}
          
          />
        </label>
        
      
        <label htmlFor="actors-search">
          ACTORS
          <input
          id ="actors-search"
          type="radio"
          value="people"
          checked={!isShowsSearch}
          onChange={onRadioChange}
          />
        </label>
      </div>
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
