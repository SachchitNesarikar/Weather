import React from "react";
import CityWeather from "./CityWeather";

const CityList = ({ cities, searchQuery }) => {
  const filteredCities = cities.filter(city =>
    city.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {filteredCities.length > 0 ? (
        filteredCities.map((city) => <CityWeather key={city.id} city={city} />)
      ) : (
        <p>No cities found</p>
      )}
    </div>
  );
};

export default CityList;
