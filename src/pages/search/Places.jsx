export default function({places, determineSize}) {
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
                    <span>
                        Open forecast 
                        <i className="fa-solid fa-arrow-right"></i>
                    </span>
                </div>
            </div>
            )
        })
}