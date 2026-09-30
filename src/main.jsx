import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Header />

    <Routes>
      <Route path="/" element={<App />}/>
    </Routes>

  </BrowserRouter>
  
)

