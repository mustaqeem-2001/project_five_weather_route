import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div>
                <i className="fa-solid fa-location-dot"></i>
                <Link to="search">Explore</Link>
            </div>
            <div>
                <i className="fa-regular fa-bookmark"></i>
                <Link to="collection">Collection</Link>
            </div>
        </footer>
    )
}