import { useEffect, useState, useRef } from "react";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";
import SearchError from "./SearchError";
import SearchNoneFound from "./SearchNoneFound";
import SearchLoading from "./SearchLoading";
import Places from "./Places.jsx";

export default function Search({searchInput, setSearchInput, placeholder, loading, setLoading, places, setPlaces}) {
    const [error, setError ] = useState(null);
    const [emptyResult, setEmptyResult ] = useState(null);
    const firstRender = useRef(true);

    function determineSize(feature_code) {
        const sizes = {
            PPLC: "Capital city",
            PPLA2: "City",
            PPL: "Small city",
        }
        return sizes[feature_code];
    }

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        setEmptyResult(false);
        setLoading(true)
        fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchInput}&count=10&language=en&format=json`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data?.results) {
                    setPlaces(data.results);
                }
                else {
                    setEmptyResult(true);
                }
                setLoading(false);
            });
    }, [searchInput])
        // Try useRef to deal with initial render for useEffect, this is causing the else statement to run straight away
        // since no data exists at initial render.
    
    return ( 
        <main>
            <Link to="/">
                <i className="fa-solid fa-arrow-left"></i>
                Home
            </Link>
            <h2>Choose a {searchInput}</h2>
            <p>{places?.length} places match your search.</p>
            <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder} />

            <section>
                <h2>PLACES</h2>
                <span>
                    <i className="fa-solid fa-earth-americas"></i>
                    Search worldwide
                </span>
                <div>
                    { 
                        loading ?
                            <h1>Loading</h1>
                        : error ? 
                            <h1>Error</h1>
                        : emptyResult ?
                            <div>
                                <div>
                                    <i className="fa-solid fa-magnifying-glass">
                                        <i className="fa-solid fa-circle-xmark"></i>
                                    </i>
                                </div>
                                <p>A SUCCESSFUL SEARCH</p>
                                <h2>Nothing matched that name</h2>
                                <p>Try another city or check the spelling. We'll look across the locations worldwide.</p>
                                <div>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <div>
                                        <p>Try a nearby city</p>
                                        <p>A place people can visit</p>
                                    </div>
                                </div>
                                <button onClick={() => setSearchInput("")}>
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                    Search again
                                </button>
                            </div>
                        : places ?
                            <Places places={places} determineSize={determineSize}/>
                        :
                        <p>Start searching for a show</p>
                    }
                </div>
                <p>Pick the right place to see its local conditions and seven-day forecast.</p>
            </section>
        </main>
    )
}