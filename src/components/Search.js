import React, { useState } from 'react'
import userService from '../service/userService';

const Search = ({placeholder, endpoint}) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
  
    const handleSearch = async () => {
      try {
        const response = await userService.searchBook(endpoint);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
        />
        <button onClick={handleSearch}>Search</button>
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </div>
    );
  };

export default Search