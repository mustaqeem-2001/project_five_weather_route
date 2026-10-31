import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export default function DetailedPlace() {
  const {searchInput, setSearchInput, placeholder, status, setStatus, setLoading, places, setPlaces} = useContext(SearchContext);
  const { state } = useLocation();
  const currentTime = new Date().toLocaleTimeString();

  const { saveToCollection, setSaveToCollection} = useContext(SearchContext);
  
  const placeExistsAlready = saveToCollection.some(place =>
    place.longitude === state.longitude &&
    place.latitude === state.latitude
  );
  
  useEffect(function() {
    async function initialPlace() {
        setStatus("loading");
        try {
          const request = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${state.latitude}&longitude=${state.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto&forecast_days=7`);
          const data = await request.json();
          if (data) {
              setPlaces(data);
              setStatus("success");
          }
          else {
              setStatus("empty");
              setPlaces([]);
          }      
        } catch(error) {
            setStatus("error");
        }
        finally {
            setLoading(false)
        }
      }
      initialPlace();
  }, [])



  useEffect(function() {
      localStorage.setItem("collection", JSON.stringify(saveToCollection));
  }, [saveToCollection])


  function addToCollection() {
    const newObj = {
      name: state.name,
      country: state.country,
      temperature_2m: places.current?.temperature_2m,
      longitude: state.longitude,
      latitude: state.latitude,
      high: places.daily?.temperature_2m_max[0],
      low: places.daily?.temperature_2m_min[0],
    }
    setSaveToCollection([...saveToCollection, newObj]);
  }

  return (
      <main className="page page--forecast">
        <div className="forecast-place-header">
          <div>
            <i className="fa-solid fa-location-dot"></i>
            {state.country}
            <h1 className="forecast-place-name">{state.name}</h1>
          </div>
          <i className="fa-regular fa-bookmark forecast-bookmark"></i>
        </div>

        <p className="forecast-date">{places.daily?.time[0]} · {currentTime}</p>

        <div className="weather-card">
          <div className="weather-card__top">
            <div>
              <span>Current weather</span>
              <span className="weather-card__condition">Mostly cloudy</span>
            </div>
            <i className="fa-solid fa-cloud-sun weather-card__icon"></i>
          </div>
          <p className="weather-temperature">
            <span>{places.current?.temperature_2m}°</span>
            Feels like {places.current?.apparent_temperature}°
          </p>

          {placeExistsAlready ? (
            <button className="saved-button">
              <i className="fa-regular fa-bookmark"></i>
              Saved to your favourite places
              <span>SAVED</span>
            </button>
          ) : (
            <button className="primary-button save-button" onClick={addToCollection}>
              Add to collection
            </button>
          )}
        </div>

        <div className="weather-metrics">
          <div className="weather-metric">
            <i className="fa-solid fa-wind weather-metric__icon"></i>
            <p className="weather-metric__label">Wind</p>
            <p className="weather-metric__value">
              {places.daily?.temperature_2m_max[0]} km /h
            </p>
          </div>
          <div className="weather-metric">
            <i className="fa-solid fa-droplet weather-metric__icon"></i>
            <p className="weather-metric__label">HUMIDITY</p>
            <p className="weather-metric__value">
              {places.daily?.precipitation_probability_max[0]}%
            </p>
          </div>
          <div className="weather-metric">
            <i className="fa-regular fa-sun weather-metric__icon"></i>
            <p className="weather-metric__label">UV INDEX</p>
            <p className="weather-metric__value">{places.daily?.weather_code[0]}</p>
          </div>
        </div>

        <div className="weekly-card">
          <div className="weekly-card__header">
            <div>
              <h2>7-day outlook</h2>
              <span>A little sun, a little rain</span>
            </div>
            <span>°C</span>
          </div>

          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[0]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[0]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[0]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[0]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[0]}</span>
          </p>
          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[1]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[1]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[1]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[1]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[1]}</span>
          </p>
          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[2]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[2]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[2]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[2]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[2]}</span>
          </p>
          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[3]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[3]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[3]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[3]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[3]}</span>
          </p>
          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[4]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[4]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[4]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[4]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[4]}</span>
          </p>
          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[5]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[5]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[5]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[5]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[5]}</span>
          </p>
          <p className="forecast-day">
            <span className="forecast-day__date">{places.daily?.time[6]}</span>{" "}
            <span>UV Index: {places.daily?.weather_code[6]}</span>{" "}
            <span>Precipitation: {places.daily?.precipitation_probability_max[6]}%</span>{" "}
            <span>temperature max: {places.daily?.temperature_2m_max[6]}</span>{" "}
            <span>temperature low: {places.daily?.temperature_2m_min[6]}</span>
          </p>
        </div>

        <p className="forecast-updated">
          <i className="fa-regular fa-cloud"></i> Forecast updated just now
        </p>
      </main>
    )
}