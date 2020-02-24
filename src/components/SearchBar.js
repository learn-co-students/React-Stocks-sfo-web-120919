import React from 'react';

const SearchBar = (props) => {
  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.displayOptions.sortBy === "Alphabetically" ? true: false} onChange={props.onSortRadioChange}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.displayOptions.sortBy === "Price" ? true: false} onChange={props.onSortRadioChange}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select onChange={props.onFilterSelectChange} value={props.displayOptions.filterBy}>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
