import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";
import SearchError from "./SearchError";
import SearchNoneFound from "./SearchNoneFound";
import SearchLoading from "./SearchLoading";
import Places from "./Places.jsx";


export default function Search({searchInput, setSearchInput, placeholder, loading, setLoading, places, setPlaces}) {
    const [error, setError ] = useState(null);
    const [emptyResult, setEmptyResult ] = useState(null); // When the user enters something but no match found.

    useEffect(() => {
        if (emptyResult === true) {
            setEmptyResult(false);
        }
        handleRequest(searchInput);
    }, [searchInput])

    async function handleRequest(input) {
        setLoading(true);
        try {
            const request = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`);
            const data = await request.json();
            
            if (data?.results) {
                setPlaces(data.results);
            }
            else {
                setEmptyResult(true);
                setPlaces([]);
            }
            
        } catch(error) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }

    function determineSize(feature_code) {
        const sizes = {
            PPLC: "Capital city",
            PPLA2: "City",
            PPL: "Small city",
        }
        return sizes[feature_code];
    }

    function handleTryAgain() {
        setSearchInput("");
        setError(false);
    }

    return ( 
        <main>
            <Link to="/">
                <i className="fa-solid fa-arrow-left"></i>
                Home
            </Link>
            <h2>Choose a {searchInput}</h2>
            <p>{places.length} places match your search.</p>
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
                            <div>
                                <div>
                                    <i className="fa-solid fa-bug-slash"></i>
                                </div>
                                <h1>FORECAST UNAVAILABLE</h1>
                                <p>Can't reach the skies</p>
                                <p>We couldn't connect to the weather service. Your search is still here - try again when your connection is ready.</p>
                                <div>
                                    <h3>YOUR SEARCH</h3>
                                    <span>London</span><span>· United kingdom</span>
                                </div>
                                <button onClick={handleTryAgain}>
                                    <i className="fa-solid fa-arrows-rotate"></i>
                                    Try again</button>
                            </div>
                        : searchInput.length === 0 ?
                            <h2>Start typing....</h2>
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
                        :
                        places ?
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