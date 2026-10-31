import { useContext, useEffect } from "react";
import SearchInput from "./components/SearchInput";
import { Link } from "react-router-dom";
import { SearchContext } from "./context/SearchContext";

export default function App() {
  
  const {searchInput, setSearchInput, placeholder, loading, status, setStatus, setLoading, places, setPlaces} = useContext(SearchContext);
  
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
      <main className="page page--home">
        <div className="home-intro">
          <div className="home-eyebrow">
            <i className="fa-regular fa-compass"></i>
            <span>A LITTLE MORE PREPARED</span>
          </div>
          <h1 className="home-title">
            Find your kind of <span>weather.</span>
          </h1>
          <p className="home-copy">
            A quick forecast makes it easier to know where to go - and what to bring.
          </p>
          <div className="home-search-panel">
            <SearchInput searchInput={searchInput} placeholder={placeholder} setSearchInput={setSearchInput}/>
            <Link to="/search" className="primary-button">
              Find a forecast
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
          <div className="home-helper">
            <i className="fa-solid fa-location-dot"></i>
            <p>Search a place to see its forecast</p>
          </div>
        </div>

        <div className="home-popular">
          <h2 className="section-kicker">A FEW PLACES TO START</h2>
          <div className="home-section-heading">
            <h2>Popular right now</h2>
            <span className="home-count">03 places</span>
          </div>
          <div className="home-place-list">
            {
              loading ?
              <p>loading...</p>
              :
              places.map(function(place) {
                return <div className="home-place" key={place.id}>
                    <i className="fa-solid fa-cloud-sun home-place__icon"></i>
                    <div className="home-place__details">
                      <span className="home-place__name">{place.name}</span>
                      <span className="home-place__country">{place.country}</span>
                    </div>
                    <span className="home-place__temperature">{place.temperature}°</span>
                    <Link
                      className="home-place__arrow"
                      to={`/detailedPlace/${place.id}`}
                      state={{
                        longitude: place.longitude,
                        latitude: place.latitude,
                        country: place.country,
                        name: place.name
                      }}
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
              })
            }
          </div>
        </div>

        <div className="home-promo">
          <i className="fa-regular fa-bookmark home-promo__icon"></i>
          <div className="home-promo__text">
            <p>Your favourite places, together</p>
            <p>Save a city for the next time you check in.</p>
          </div>
          <Link className="home-promo__arrow" to="/collection">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>        
        </div>
      </main>
    )
}