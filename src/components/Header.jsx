import { useLocation, useParams, Link } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    
    const headerConfig = {
        "home": "YOUR DAY, OUTSIDE",
        "success": "PLACE SEARCH",
        "loading": "CHECKING CONDITION",
        "error": "CONNECTION ISSUE",
        "collection": <Link to="/search"><i className="fa-solid fa-plus"></i></Link>,
        "empty": "PLACE SEARCH",
        "emptyCollection": "SAVED PLACES",
        "detailedInfo": "FORECAST",
    }

    const header  = location.pathname.startsWith("/detailedPlace") ? "FORECAST" : headerConfig[location.pathname]

    return (
        <header>
            <i className="fa-solid fa-cloud-sun"></i>
            <span>weather</span><span>route</span>
            {header}
        </header>
    )
}