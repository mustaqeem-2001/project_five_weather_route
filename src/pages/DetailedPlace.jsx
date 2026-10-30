import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export default function DetailedPlace() {
  const {searchInput, setSearchInput, placeholder, status, setStatus, setLoading, places, setPlaces} = useContext(SearchContext);
  const { state } = useLocation();
  const currentTime = new Date().toLocaleTimeString();

  const [saveToCollection, setSaveToCollection] = useState(() => {
    const collectionStorage = localStorage.getItem("collection");
    return collectionStorage ? JSON.parse(collectionStorage) : [];
});
  
  const placeExistsAlready = saveToCollection.some(place => {
    return place.longitude === state.longitude &&
           place.latitude === state.latitude;
  });

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
    const updatedCollection = saveToCollection
        ? [...saveToCollection, state]
        : [state];

    setSaveToCollection(updatedCollection);
}

  return (
    <main>
      <div>
        <div>
          <i className="fa-solid fa-location-dot"></i>
          {state.country}
          <h1>{state.name}</h1>
        </div>
        <i className="fa-regular fa-bookmark"></i>
      </div>
      <p>{places.daily?.time[0]} · {currentTime}</p>
      <div>
        <div>
          <div>
            <span>Current weather</span>
            <span>Mostly cloudy</span>
          </div>
          <i className="fa-solid fa-cloud-sun"></i>
        </div>
        <p><span>{places.current?.temperature_2m}°</span>Feels like {places.current?.apparent_temperature}°</p>
        
        {placeExistsAlready ? <button>
          <i className="fa-regular fa-bookmark"></i>
          Saved to your favourite places
          <span>SAVED</span> 
        </button> : <button onClick={addToCollection}>Add to collection</button> }
      </div>

      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div>
        <div>
          <div>
            <h2>7-day outlook</h2>
            <span>A little sun, a little rain</span>
          </div>
          <span>°C</span>
        </div>
        <p>{places.daily?.time[0]} <span>UV Index: {places.daily?.weather_code[0]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[0]}</span> <span>temperature max: {places.daily?.temperature_2m_max[0]}</span> <span>temperature low: {places.daily?.temperature_2m_min[0]}</span></p>
        <p>{places.daily?.time[1]} <span>UV Index: {places.daily?.weather_code[1]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[1]}</span> <span>temperature max: {places.daily?.temperature_2m_max[1]}</span> <span>temperature low: {places.daily?.temperature_2m_min[1]}</span></p>
        <p>{places.daily?.time[2]} <span>UV Index: {places.daily?.weather_code[2]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[2]}</span> <span>temperature max: {places.daily?.temperature_2m_max[2]}</span> <span>temperature low: {places.daily?.temperature_2m_min[2]}</span></p>
        <p>{places.daily?.time[3]} <span>UV Index: {places.daily?.weather_code[3]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[3]}</span> <span>temperature max: {places.daily?.temperature_2m_max[3]}</span> <span>temperature low: {places.daily?.temperature_2m_min[3]}</span></p>
        <p>{places.daily?.time[4]} <span>UV Index: {places.daily?.weather_code[4]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[4]}</span> <span>temperature max: {places.daily?.temperature_2m_max[4]}</span> <span>temperature low: {places.daily?.temperature_2m_min[4]}</span></p>
        <p>{places.daily?.time[5]} <span>UV Index: {places.daily?.weather_code[5]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[5]}</span> <span>temperature max: {places.daily?.temperature_2m_max[5]}</span> <span>temperature low: {places.daily?.temperature_2m_min[5]}</span></p>
        <p>{places.daily?.time[6]} <span>UV Index: {places.daily?.weather_code[6]}</span> <span>Precipitation: {places.daily?.precipitation_probability_max[6]}</span> <span>temperature max: {places.daily?.temperature_2m_max[6]}</span> <span>temperature low: {places.daily?.temperature_2m_min[6]}</span></p>
      </div>
      <p><i className="fa-regular fa-cloud"></i> Forecast updated just now</p>
    </main>
  )
}