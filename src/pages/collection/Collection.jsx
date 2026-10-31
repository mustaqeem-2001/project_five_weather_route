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
      <main className="page page--collection">
        {saveToCollection === undefined || saveToCollection.length === 0 ? (
          <CollectionEmpty />
        ) : (
          <>
            <p className="collection-eyebrow">
              <i className="fa-regular fa-bookmark"></i>
              YOUR COLLECTION
            </p>
            <h1>Saved places</h1>
            <p className="collection-description">
              Your go to forecasts all in one place{" "}
              <span className="collection-count">{saveToCollection.length}</span>
            </p>
            <p className="collection-banner">
              <i className="fa-solid fa-check"></i>
              <span>Places saved for quick check-ins</span>
              <span>Today</span>
            </p>

            {saveToCollection.map(function(place) {
              console.log(place);
              return (
                <section className="saved-place-card" key={place.latitude}>
                  <div className="saved-place-card__top">
                    {/* uv index number displays either sunny windy rainy etc. */}
                    <div>
                      <p className="saved-place-card__name">{place.name}</p>
                      <span className="saved-place-card__country">
                        {place.country}
                      </span>
                    </div>
                    <div>
                      <p className="saved-place-card__temperature">
                        {place.temperature_2m}°
                      </p>
                      now
                    </div>
                  </div>

                  <div className="saved-place-card__bottom">
                    <div>
                      <span className="saved-place-card__high-low">
                        High {place.high}° / Low {place.low}°
                      </span>
                    </div>
                    <div className="saved-place-card__actions">
                      <span className="saved-place-card__forecast">
                        Forecast
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </span>
                      <button
                        className="icon-button"
                        onClick={() =>
                          handleDelete(place.longitude, place.latitude)
                        }
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
          </>
        )}
      </main>
    )
}