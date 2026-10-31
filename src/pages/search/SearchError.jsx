export default function SearchError({handleTryAgain}) {
    return (
        <div className="search-state">
            <div className="search-state__icon">
            <i className="fa-solid fa-bug-slash"></i>
            </div>
            <h1>FORECAST UNAVAILABLE</h1>
            <p>Can't reach the skies</p>
            <p>We couldn't connect to the weather service. Your search is still here - try again when your connection is ready.</p>
            <div className="search-state__query">
            <h3>YOUR SEARCH</h3>
            <span>London</span><span>· United kingdom</span>
            </div>
            <button className="primary-button search-state__action" onClick={handleTryAgain}>
            <i className="fa-solid fa-arrows-rotate"></i>
            Try again
            </button>
        </div>
    )
}