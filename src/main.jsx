import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import DetailedPlace from "./pages/DetailedPlace.jsx";
import Search from "./pages/search/Search.jsx";
import Collection from "./pages/collection/Collection.jsx";
import { useState } from "react";

function Root() {
  const [ searchInput, setSearchInput ] = useState("");
  const [loading, setLoading ] = useState(false);
  const placeholder = "Search a city or place";  
  const [places, setPlaces] = useState([])
  const [status, setStatus ] = useState("idle");


  return (
    <BrowserRouter>
        <Header status={status}/>
        <Routes>
          <Route path="/" element={<App status={status} setLoading={setLoading} setPlaces={setPlaces} places={places} searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder} />}/>
          <Route path="/search" element={<Search status={status} setStatus={setStatus} setLoading={setLoading} setPlaces={setPlaces} places={places} searchInput={searchInput} setSearchInput={setSearchInput} placeholder={placeholder}/>}/>
          <Route path="/collection" element={<Collection status={status} />}/>
          <Route path="/detailedPlace/:id" element={<DetailedPlace />} />
        </Routes>

      </BrowserRouter>
  )
}

const root = createRoot(document.getElementById("root"));

root.render(
  <Root/>
)

