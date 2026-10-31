import { Link } from "react-router-dom";

export default function CollectionEmpty() {
  return (
    <section>
      <p>
        <i className="fa-regular fa-bookmark"></i> 
        YOUR COLLECTION
      </p>
      <h1>Saved Places</h1>
      <p>Keep your favourite forecasts close.</p>

      <div>
        <div>
          <i className="fa-regular fa-bookmark"></i> 
        </div>
        <p>ROOM FOR SOMEWHERE</p>
        <h2>Your list is clear skies</h2>
        <p>Save a place from it's forecast and it'll be waiting here next time.</p>

        <div>
          <i className="fa-solid fa-location-dot"></i>
          <div>
            <h3>Start with a city</h3>
            <p>Check the weather, then save it.</p>
          </div>
          <Link to="/search">
            <i className="fa-solid fa-magnifying-glass"></i>
            Find a place
          </Link>
        </div>
      </div>
    </section>
  )
}