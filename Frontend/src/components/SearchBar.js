import React from "react";

const SearchBar = ({ setSearchQuery }) => {
  const searchBarStyle = {
    width: "100%",
    maxWidth: "1000px",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "black", // 🖤 Black background
    color: "white", // White text
    fontSize: "16px",
    outline: "none",
  };

  return (
    <input
      type="text"
      style={searchBarStyle} // Apply inline styles
      placeholder="Search city..."
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
};

export default SearchBar;
