import { Link, Navigate } from "react-router-dom";


export default function({places, determineSize}) {

    if (!Array.isArray(places) || places.length === 0) {
        return <Navigate to="/search" replace />;
    }


     return places.map(function(place) {
        return (
            <div key={place.id}>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                    <span>{place.name}</span>
                    <span>{place.admin2},{place.admin1}</span>
                    <span>{place.country}</span>
                </div>
                <br />
                <div>
                    <span>{determineSize(place.feature_code)} · {place.country_code}</span>
                    <Link to={`/detailedPlace/${place.id}`} state={{longitude: place.longitude, latitude: place.latitude, country: place.country, name: place.name}}>
                        Open forecast 
                        <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
            )
        })
}