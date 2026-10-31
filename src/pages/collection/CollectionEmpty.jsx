import { Link } from "react-router-dom";

export default function CollectionEmpty() {
  return (
      <section className="collection-empty">
        <p className="collection-eyebrow">
          <i className="fa-regular fa-bookmark"></i>
          YOUR COLLECTION
        </p>
        <h1 className="page-title">Saved Places</h1>
        <p className="page-subtitle">Keep your favourite forecasts close.</p>

        <div className="empty-card">
          <div className="empty-card__icon">
            <i className="fa-regular fa-bookmark"></i>
          </div>
          <p className="section-kicker">ROOM FOR SOMEWHERE</p>
          <h2>Your list is clear skies</h2>
          <p>
            Save a place from it's forecast and it'll be waiting here next time.
          </p>

          <div className="empty-card__hint">
            <i className="fa-solid fa-location-dot"></i>
            <div>
              <h3>Start with a city</h3>
              <p>Check the weather, then save it.</p>
            </div>
            <Link to="/search" className="primary-button empty-card__button">
              <i className="fa-solid fa-magnifying-glass"></i>
              Find a place
            </Link>
          </div>
        </div>
      </section>
    )
}