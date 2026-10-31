import { useContext, useEffect } from "react"
import { SearchContext } from "../../context/SearchContext.jsx";
import CollectionEmpty from "./CollectionEmpty.jsx";

export default function Collection() {
  const {saveToCollection, setSaveToCollection} = useContext(SearchContext);

  function handleDelete(longitude, latitude) {
    const modified = saveToCollection.filter((place) => {
      return place.longitude !== longitude || place.latitude !== latitude;
    })
    setSaveToCollection(modified);
  }

  useEffect(function() {
    localStorage.setItem("collection", JSON.stringify(saveToCollection))
  }, [saveToCollection])

  return (
    <main>
      <p>
        <i className="fa-regular fa-bookmark"></i>
        YOUR COLLECTION
      </p>
      <h1>Saved places</h1>
      <p>Your go to forecasts all in one place <span>{saveToCollection.length}</span></p>
      <p>
        <i className="fa-solid fa-check"></i>
        <span>Places saved for quick check-ins</span>
        <span>Today</span>
      </p>

      
        {
          saveToCollection === undefined || saveToCollection.length === 0 ?
            <CollectionEmpty />
          :
          saveToCollection.map(function(place) {
            console.log(place);
            return (
              <section key={place.latitude}>
                <div>
                  {/* uv index number displays either sunny windy rainy etc. */}
                    <div>
                      <p>{place.name}</p>
                      <span>{place.country}</span>
                    </div>
                    <div>
                      <p>{place.temperature_2m}°</p>
                      now
                    </div>
                </div>

                <div>
                  <div>
                    <span>High {place.high}° / Low {place.low}°</span>
                  </div>
                  <div>
                    <span>
                      Forecast 
                      <i className="fa-solid fa-arrow-right-long"></i>            
                    </span>
                    <button onClick={() => handleDelete(place.longitude, place.latitude)}><i className="fa-regular fa-trash-can"></i></button>
                  </div>
                </div>
              </section>
            )
          })
        }
    </main>
  )
}