import { useState, useEffect, createContext } from "react";

export const SearchContext = createContext();

export function SearchProvider({children}) {

    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [places, setPlaces] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    
    const [saveToCollection, setSaveToCollection] = useState(() => {
        const storedCollection = localStorage.getItem("collection");
        if (!storedCollection) return [];
        const parsedCollection = JSON.parse(storedCollection);
        return Array.isArray(parsedCollection) ? parsedCollection : [];
    });

    const values = {
        status,
        setStatus,
        loading,
        setLoading,
        places,
        setPlaces,
        searchInput,
        setSearchInput,
        saveToCollection,
        setSaveToCollection,
    };

    useEffect(() => {
        localStorage.setItem("collection", JSON.stringify(saveToCollection));
    }, [saveToCollection]);

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )
}