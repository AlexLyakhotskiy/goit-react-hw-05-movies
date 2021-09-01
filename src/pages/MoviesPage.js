import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import InfiniteScroll from 'react-infinite-scroll-component';

import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';
import MoviesGallery from '../components/MoviesGallery/MoviesGallery';
import SearchBar from '../components/SearchBar/SearchBar';

import api from '../utils/ApiServices';

export default function MoviesPage() {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [hasMorePage, setHasMorePage] = useState(true);

  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (!query) {
      return;
    }

    setMovies([]);
    api.resetPage();
    api.setAllPages(1);
    setHasMorePage(true);
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
      .then(({ total_pages, results }) => {
        if (!results.length) {
          toast.error(`On your query "${query}" nothing matches found. `);
          return;
        }

        if (total_pages === 1) {
          setHasMorePage(false);
        }

        api.increasePage();
        api.setAllPages(total_pages);
        setMovies(prev => [...prev, ...results]);
      })
      .catch(({ message }) => console.log(message));
  }

  return (
    <>
      <SearchBar />
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
