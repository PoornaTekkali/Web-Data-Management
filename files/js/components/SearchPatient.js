import React, { useState } from 'react';

function SearchPatient({ search }) {

  const [filterpatientname , setFilterpatientname] = useState('');

const handleClick = () => {
      console.log(search)
        // Call the onSearch function passed from App component
        search(filterpatientname);
    };
return (
	<div className="prescription-filter-container">
        <input
          type="text"
          placeholder="Search Patient"
          value={filterpatientname}
          onChange={e => setFilterpatientname(e.target.value)}
          style={{"width":"60%" , "color":"black"}}
          onKeyDown={e => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
        />
        <button style={{"margin":"2%"}} onClick={handleClick} > Search </button>
      </div>
  )
}

export default SearchPatient;
