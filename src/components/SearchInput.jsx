export default function SearchInput({searchInput, placeholder, setSearchInput}) {
    return (
        <div className="search-input">
            <i className="fa-solid fa-magnifying-glass search-input__icon"></i>
            <input
            className="search-input__field"
            value={searchInput}
            placeholder={placeholder}
            onChange={(e) => setSearchInput(e.target.value)}
            />
        </div>
    )
}