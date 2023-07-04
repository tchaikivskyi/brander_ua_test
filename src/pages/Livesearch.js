import React, { useState, useEffect, useRef, useCallback } from 'react';
import Search from '../component/Search';
import { fetchImages } from '../resources/imagesResources';
import Images from '../component/Images';
import Loader from '../component/Spinner/Loader';

export default () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pageImages, setPageImages] = useState(1);

  const debounceSearch = useRef(null);

  const handleChangeSearchTerm = (value) => {
    setSearchTerm(value);
    setPageImages(1);
    if (value === '') {
      setLoading(false);
    }
  };

  const searchImages = (isExist = false) => {
    try {
      fetchImages(searchTerm, 20, pageImages).then((response) => {
        if (response.status === 200) {
          if (isExist) {
            setSearchResults((prev) => [...prev, ...response.data]);
          } else {
            setSearchResults(response.data);
          }
          handleChangePage();
        } else {
          setError('Something went wrong!!!');
        }
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleChangePage = useCallback(() => {
    setPageImages((prevPage) => prevPage + 1);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        searchImages(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pageImages, handleChangePage]);

  useEffect(() => {
    if (debounceSearch.current) {
      clearTimeout(debounceSearch.current);
    }
    if (searchTerm.length > 0) {
      setLoading(true);
      debounceSearch.current = setTimeout(() => {
        setSearchResults([]);
        setPageImages(1);
        searchImages();
        setLoading(false);
      }, 200);
    } else {
      setPageImages(1);
      setSearchResults([]);
    }
  }, [searchTerm]);

  const imgBlock = !searchResults.length && searchTerm.length ? (
    <span className="notice">Not found!!!</span>
  ) : (
    <Images images={searchResults} />
  );
    

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Search searchValue={searchTerm} changeValue={handleChangeSearchTerm} />
      {!loading ? imgBlock : <Loader />}
    </div>
  );
};
