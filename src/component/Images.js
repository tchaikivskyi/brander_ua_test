export default ({images}) => {

    return (
        <ul className="img-block">
            {images.map((result) => (
                <li className="img-item" key={result.id} data-id={result.id}>
                    <img src={result.thumbnailUrl} alt={result.title} loading="lazy" />                
                </li>
            ))}
        </ul>
    )
}