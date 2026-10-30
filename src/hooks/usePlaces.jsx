import { useContext } from "react";
import { SearchContext } from "../context/SearchContext.jsx";

export default function usePlaces() {
    return useContext(SearchContext);
}