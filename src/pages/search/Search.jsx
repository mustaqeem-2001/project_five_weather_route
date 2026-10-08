import { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";
import SearchError from "./SearchError";
import SearchNoneFound from "./SearchNoneFound";
import SearchLoading from "./SearchLoading";
import Places from "./Places.jsx";


export default function Search({searchInput, setSearchInput, placeholder, status, setStatus, setLoading, places, setPlaces}) {

    useEffect(() => {
        handleRequest(searchInput);
    }, [searchInput])

    async function handleRequest(input) {
        setStatus("loading");
        try {
            const request = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`);
            const data = await request.json();
            
            if (data?.results) {
                setPlaces(data.results);
            }
            else {
                setStatus("empty");
                setPlaces([]);
            }
            
        } catch(error) {
            setStatus("error");
        }
        // finally {
        //     setStatus()
        // }
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
                        status === "loading" ?
                            <SearchLoading />
                        : status === "error" ? 
                            <SearchError handleTryAgain={handleTryAgain}/>
                        : status === "idle" ?
                            <h2>Start typing....</h2>
                        : status === "empty" ?
                            <SearchNoneFound handleTryAgain={handleTryAgain}/>
                        :
                        status === "success" ?
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