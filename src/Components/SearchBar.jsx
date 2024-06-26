import React from "react";
import { FaBeer } from "react-icons/fa";

const SearchBar = (props) => {
  const { onChange } = props;

  return (
    <React.Fragment>
      <input
        // type="search"
        placeholder="Search Location....."
        className="searchBar"
        name="search"
        style={{padding:"2px"}}
        onChange={onChange}
      ></input>
    </React.Fragment>
  );
};

export default SearchBar;
