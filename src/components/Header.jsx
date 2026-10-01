import { useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const headerConfig = {
        "/": "YOUR DAY, OUTSIDE",
        "/search": "PLACE SEARCH",
        "/searchLoading": "CHECKING CONDITION",
        "/searchError": "CONNECTION ISSUE",
        "/detailedPlace": "FORECAST",
        "/collection": <i className="fa-solid fa-plus"></i>,

    }
    return (
        <header>
            <i className="fa-solid fa-cloud-sun"></i>
            <h1>weatherroute</h1>
            {headerConfig[location.pathname]}
        </header>
    )
}