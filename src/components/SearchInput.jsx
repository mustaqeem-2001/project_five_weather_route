export default function SearchInput({searchInput, placeholder, setSearchInput}) {
    return ( 
        <div>
            <i className="fa-solid fa-magnifying-glass"></i>
            <input value={searchInput} placeholder={placeholder} onChange={(e) => setSearchInput(e.target.value)}/>
        </div>
    )
}