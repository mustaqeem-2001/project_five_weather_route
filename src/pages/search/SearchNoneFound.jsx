export default function SearchNoneFound({handleTryAgain}) {
    return (
        <div className="search-state">
            <div className="search-state__icon">
            <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <p className="section-kicker">A SUCCESSFUL SEARCH</p>
            <h1>Nothing matched that name</h1>
            <p>Try another city or check the spelling. We'll look across locations worldwide. </p>
            <div className="empty-card__hint">
            <i className="fa-solid fa-location-dot"></i>
            <div>
                <h3>Try a nearby search</h3>
                <p>A place people can visit.</p>
            </div>
            </div>
            <button className="primary-button search-state__action" onClick={handleTryAgain}>
            <i className="fa-solid fa-arrows-rotate"></i>
            Try again
            </button>
            <p>
            <i className="fa-regular fa-star"></i>
            Every good trip starts somewhere.
            </p>
        </div>
    )
}