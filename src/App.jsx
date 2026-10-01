import { useEffect } from "react";
import SearchInput from "./components/SearchInput";
import { Link } from "react-router-dom";

export default function App({searchInput, setSearchInput, placeholder}) {

  useEffect(function() {
    setSearchInput("");
  }, [])


  return (
    <main>
      <SearchInput searchInput={searchInput} placeholder={placeholder} setSearchInput={setSearchInput}/>
      <Link to="/search">Search</Link>
    </main>
  )
}