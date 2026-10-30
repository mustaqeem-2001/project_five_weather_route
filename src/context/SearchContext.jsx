import { useState, createContext } from "react";

export const SearchContext = createContext();

export function SearchProvider({children}) {

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    const values = {
        status,
        setStatus,
        loading,
        setLoading,
        places,
        setPlaces,
        searchInput,
        setSearchInput,
    };

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )
}