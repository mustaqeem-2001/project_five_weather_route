import { useEffect } from "react";
import SearchInput from "./components/SearchInput";
import { Link } from "react-router-dom";

export default function App({searchInput, setSearchInput, placeholder}) {

  useEffect(function() {
    setSearchInput("");
  }, [])


  return (
    <main>
      <div>
        <div>
          <i className="fa-regular fa-compass"></i>
          <span>A LITTLE MORE PREPARED</span>
        </div>
        <h1>Find your kind of <span>weather.</span></h1>
        <p>A quick forecast makes it easier to know where to go - and what to bring.</p>
        <div>
          <SearchInput searchInput={searchInput} placeholder={placeholder} setSearchInput={setSearchInput}/>
          <Link to="/search">
            Search
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
        <div>
          <i className="fa-solid fa-location-dot"></i>
          <p>Search a place to see its forecast</p>
        </div>
      </div>

      <div>
        <h2>A FEW PLACES TO START</h2>
        <div>
          <h3>Popular right now</h3>
          <span>03 places</span>
        </div>
        <div>
          {/* locations of top 3 places */}
        </div>
      </div>
    </main>
  )
}