export default ({searchValue, changeValue}) => {

    return (
        <div className="search">
            <input type="text" 
                    value={searchValue} 
                    onChange={(e) => changeValue(e.target.value)} 
                    placeholder="Search..." />
        </div>
    )
}