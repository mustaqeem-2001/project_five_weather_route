import { Link } from "react-router-dom";
import usePlaces from "../hooks/usePlaces";
export default function Footer() {
    const { places, setPlaces } = usePlaces();
    return (
        <footer className="bottom-nav">
            <div className="bottom-nav__item">
            <i className="fa-solid fa-location-dot"></i>
            <Link
                className="bottom-nav__link"
                to="/search"
                onClick={() => setPlaces([])}
            >
                Explore
            </Link>
            </div>
            <div className="bottom-nav__item">
            <i className="fa-regular fa-bookmark"></i>
            <Link className="bottom-nav__link" to="/collection">
                Collection
            </Link>
            </div>
        </footer>
    )
}