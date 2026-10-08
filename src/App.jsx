import { useEffect, useState } from "react";
import SearchInput from "./components/SearchInput";
import { Link } from "react-router-dom";

export default function App({searchInput, setSearchInput, placeholder, places, setPlaces, status, setStatus}) {
    const cities = [
    {
      id: 2643743,
      name: "London",
      latitude: 51.50853,
      longitude: -0.12574
    },
    {
      id: 1850147,
      name: "Tokyo",
      latitude: 35.6895,
      longitude: 139.69171
    },
    {
      id: 3413829,
      name: "Reykjavik",
      latitude: 64.13548,
      longitude: -21.89541
    }
  ];


  useEffect(function() {
    setSearchInput("");
    setStatus("loading");
    Promise.all(
      cities.map((city) => {
            return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m`)
              .then(res => res.json())
              .then(data => {
                return {
                  ...city,
                  temperature: data.current.temperature_2m
                }
              });
      })
    ).then(result => {
      setPlaces(result)
      setLoading(false);
    });
  }, [])

  return (
    <main>
      <div>
        <div>
          <i className="fa-regular fa-compass"></i>
          <span>A LITTLE MORE PREPARED</span>
        </div>
        <h1>Find your kind of <span>weather.</span></h1>
        <p>A quick forecast makes it easier to know where to go - and what to bring.</p>
        <div>
          <SearchInput searchInput={searchInput} placeholder={placeholder} setSearchInput={setSearchInput}/>
          <Link to="/search">
            Find a forecast
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div>
          <i className="fa-solid fa-location-dot"></i>
          <p>Search a place to see its forecast</p>
        </div>
      </div>

      <div>
        <h2>A FEW PLACES TO START</h2>
        <div>
          <h3>Popular right now</h3>
          <span>03 places</span>
        </div>
        <div>
          {
            loading ?
            <p>loading...</p>
            :
            places.map(function(place) {
              return <div key={place.id}>
                  <i className="fa-solid fa-cloud-sun"></i>
                  <div>
                    <span>{place.name}</span>
                    <span>{place.country}</span>
                  </div>
                  <span>{place.temperature}°</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
            })
          }
        </div>
      </div>

      <div>
        <i className="fa-regular fa-bookmark"></i>
        <div>
          <p>Your favourite places, together</p>
          <p>Save a city for the next time you check in.</p>
        </div>
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    </main>
  )
}