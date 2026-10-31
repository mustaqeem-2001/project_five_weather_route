import { useLocation, Link } from "react-router-dom";

export default function Header() {
    const location = useLocation();
    const header = location.pathname.startsWith("/detailedPlace");
    const headerConfig = {
        "/": "YOUR DAY, OUTSIDE",
        "/search": "PLACE SEARCH",
        "/loading": "CHECKING CONDITION",
        "/error": "CONNECTION ISSUE",
        "/collection": <Link to="/search"><i className="fa-solid fa-plus"></i></Link>,
        "/empty": "PLACE SEARCH",
        "/emptyCollection": "SAVED PLACES",
    }

    return (
        <header>
            <div>
                <i className="fa-solid fa-cloud-sun"></i>
                <span>weather</span><span>route</span>
            </div>
            {header ? "FORECAST" : headerConfig[location.pathname]}
        </header>
    )
}