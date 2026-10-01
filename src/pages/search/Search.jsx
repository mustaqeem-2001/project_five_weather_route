import { useState } from "react";
import SearchInput from "../../components/SearchInput";
import { Link } from "react-router-dom";
import SearchError from "./SearchError";
import SearchNoneFound from "./SearchNoneFound";
import SearchLoading from "./SearchLoading";

export default function Search({searchInput, setSearchInput, placeholder}) {

    const [loading, setLoading] = useState(true);
    const [error, setError ] = useState(null);
    const [empty, setEmpty ] = useState(null);

    // if (loading) {
    //     <SearchLoading />
    // }
    // if (error) {
    //     <SearchError />
    // }
    // if (empty) {
    //     <SearchNoneFound />
    // }

    return ( 
        <main>Search page
            <SearchInput searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder} />
            <button>Search</button>
            <Link to="/">Back to Home</Link>
        </main>
    )
}