import { Link, Navigate } from "react-router-dom";


export default function({places, determineSize}) {

    if (!Array.isArray(places) || places.length === 0) {
        return <Navigate to="/search" replace />;
    }

    return places.map(function(place) {
        return (
            <div className="place-result-card" key={place.id}>
            <i className="fa-solid fa-location-dot place-result-card__icon"></i>
            <div className="place-result-card__details">
                <span className="place-result-card__name">{place.name}</span>
                <span className="place-result-card__area">{place.admin2},{place.admin1}</span>
                <span className="place-result-card__country">{place.country}</span>
            </div>
            <br />
            <div className="place-result-card__bottom">
                <span className="place-result-card__meta">{determineSize(place.feature_code)} · {place.country_code}</span>
                <Link className="place-result-card__open" to={`/detailedPlace/${place.id}`} state={{longitude: place.longitude, latitude: place.latitude, country: place.country, name: place.name}}>
                Open forecast
                <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
            </div>
        )
    })
}