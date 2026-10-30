import { Link } from "react-router-dom";
import usePlaces from "../hooks/usePlaces";
export default function Footer() {
    const { places, setPlaces } = usePlaces();
    return (
        <footer>
            <div>
                <i className="fa-solid fa-location-dot"></i>
                <Link to="/search" onClick={() => setPlaces([])}>
                    Explore
                </Link>
            </div>
            <div>
                <i className="fa-regular fa-bookmark"></i>
                <Link to="collection">Collection</Link>
            </div>
        </footer>
    )
}