export default function SearchError({handleTryAgain}) {
    return ( 
        <div>
            <div>
                <i className="fa-solid fa-bug-slash"></i>
            </div>
            <h1>FORECAST UNAVAILABLE</h1>
            <p>Can't reach the skies</p>
            <p>We couldn't connect to the weather service. Your search is still here - try again when your connection is ready.</p>
            <div>
                <h3>YOUR SEARCH</h3>
                <span>London</span><span>· United kingdom</span>
            </div>
            <button onClick={handleTryAgain}>
                <i className="fa-solid fa-arrows-rotate"></i>
                Try again</button>
        </div>
    )
}