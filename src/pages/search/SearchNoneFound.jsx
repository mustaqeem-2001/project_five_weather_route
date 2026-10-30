export default function SearchNoneFound({handleTryAgain}) {
    return ( 
         <div>
            <div>
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <p>A SUCCESSFUL SEARCH</p>
            <h1>Nothing matched that name</h1>
            <p>Try another city or check the spelling. We'll look across locations worldwide. </p>
            <div>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                    <h3>Try a nearby search</h3>
                    <p>A place people can visit.</p>
                </div>
                
            </div>
            <button onClick={handleTryAgain}>
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