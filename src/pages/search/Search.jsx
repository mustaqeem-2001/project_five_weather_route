import { useEffect, useContext } from "react";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";
import SearchError from "./SearchError";
import SearchNoneFound from "./SearchNoneFound";
import SearchLoading from "./SearchLoading";
import Places from "./Places.jsx";
import { SearchContext } from "../../context/SearchContext.jsx";
import usePlaces from "../../hooks/usePlaces.jsx";

export default function Search() {
    const {searchInput, setSearchInput, placeholder, status, setStatus, setLoading} = useContext(SearchContext);
    const { places, setPlaces } = usePlaces();
    
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
                setStatus("success");
            }
            else {
                setStatus("empty");
                setPlaces([]);
            }
            
        } catch(error) {
            setStatus("error");
        }
        finally {
            setLoading(false)
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
    }

    return (
        <main className="page page--search">
            <Link to="/" className="back-link">
            <i className="fa-solid fa-arrow-left"></i>
            Home
            </Link>
            <h2 className="page-title">Choose a {searchInput}</h2>
            <p className="page-subtitle">{places?.length} places match your search.</p>
            <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder} />

            <section className="search-results-section">
            <div className="search-toolbar">
                <h2 className="section-kicker">PLACES</h2>
                <span className="search-worldwide">
                <i className="fa-solid fa-earth-americas"></i>
                Search worldwide
                </span>
            </div>
            <div className="place-result-list">
                {
                status === "loading" ?
                    <SearchLoading />
                : status === "error" ?
                    <SearchError handleTryAgain={handleTryAgain}/>
                : status === "idle" ?
                    <h2>Start typing....</h2>
                : status === "empty" ?
                    <SearchNoneFound handleTryAgain={handleTryAgain}/>
                : status === "success" ?
                    <Places places={places} determineSize={determineSize}/>
                :
                    <p>Start searching for a show</p>
                }
            </div>
            <p className="page-footnote">Pick the right place to see its local conditions and seven-day forecast.</p>
            </section>
        </main>
    )
}