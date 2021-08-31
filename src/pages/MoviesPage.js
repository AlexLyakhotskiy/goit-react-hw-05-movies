import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';

import MoviesGallery from '../components/MoviesGallery/MoviesGallery';
import SearchBar from '../components/SearchBar/SearchBar';

import api from '../utils/ApiServices';

export default function MoviesPage() {
  const history = useHistory();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [hasMorePage, setHasMorePage] = useState(true);

  useEffect(() => {
    if (!location.search) {
      return;
    }
    const locationQuery = new URLSearchParams(location.search).get('query');
    setQuery(locationQuery);
  }, []);

  useEffect(() => {
    if (!query) {
      return;
    }

    setMovies([]);
    api.resetPage();
    api.setAllPages(1);
    setHasMorePage(true);
    history.push({ ...location, search: `query=${query}` });
    getMoviesByQuery();
  }, [query]);

  function getMoviesByQuery() {
    if (api.currentPage > api.allPages) {
      toast.error(`There are no pages left`);
      setHasMorePage(false);
      return;
    }

    api
      .fetchMovieByQuery(query)
      .then(data => {
        if (!data.results.length) {
          toast.error(`On your query "${query}" nothing matches found. `);
          return;
        }

        if (data.total_pages === 1) {
          setHasMorePage(false);
        }

        api.incresePage();
        api.setAllPages(data.total_pages);
        setMovies(prev => [...prev, ...data.results]);
      })
      .catch(({ message }) => console.log(message));
  }

  return (
    <>
      <SearchBar onSubmit={setQuery} />
      {!!movies.length && (
        <InfiniteScroll
          className="InfiniteScroll"
          dataLength={movies.length}
          next={getMoviesByQuery}
          hasMore={hasMorePage}
          loader={<LoaderSpinner />}
        >
          <MoviesGallery MoviesData={movies} />
        </InfiniteScroll>
      )}
    </>
  );
}
