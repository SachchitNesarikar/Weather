import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search city..."
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
