import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import DetailedPrice from "./pages/DetailedPlace.jsx";
import Search from "./pages/search/Search.jsx";
import Collection from "./pages/collection/Collection.jsx";
import { useState } from "react";

function Root() {
  const [ searchInput, setSearchInput ] = useState("");
  const [loading, setLoading ] = useState(false);
  const placeholder = "Search a city or place";  
  const [places, setPlaces] = useState([])

  return (
    <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<App loading={loading} setLoading={setLoading} setPlaces={setPlaces} places={places} searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder} />}/>
          <Route path="/search" element={<Search loading={loading} setLoading={setLoading} setPlaces={setPlaces} places={places} searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder}/>}/>
          <Route path="/collection" element={<Collection />}/>
          <Route path="/detailedPrice" element={<DetailedPrice />} />
        </Routes>

      </BrowserRouter>
  )
}

const root = createRoot(document.getElementById("root"));

root.render(
  <Root/>
)

