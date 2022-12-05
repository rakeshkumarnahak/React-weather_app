// https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=a149e77247b202ceec5e21ab15d41267

import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("delhi");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=a149e77247b202ceec5e21ab15d41267`;

      let res = await fetch(url);
      let data = await res.json();
      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { speed } = data.wind;
      const { name } = data;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        speed,
        name,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Search..."
            autofocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* Our temp card */}
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
