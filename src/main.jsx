import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import DetailedPlace from "./pages/DetailedPlace.jsx";
import Search from "./pages/search/Search.jsx";
import Collection from "./pages/collection/Collection.jsx";
import Footer from "./components/Footer.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

function Root() {
  return (
    <BrowserRouter>
    
          <SearchProvider>
            <Header/>
                <Routes>
                <Route path="/" element={<App />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/collection" element={<Collection />}/>
                <Route path="/detailedPlace/:id" element={<DetailedPlace />} />
              </Routes>
            <Footer />
          </SearchProvider>        
        
      </BrowserRouter>
  )
}

const root = createRoot(document.getElementById("root"));

root.render(
  <Root/>
)

