import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from 'react-toastify';
import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';

import MoviesGallery from '../components/MoviesGallery/MoviesGallery';

import api from '../utils/ApiServices';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [pagesControl, setPagesControl] = useState({
    currentPage: 1,
    allPages: 1,
    hasMorePage: true,
  });
  const { currentPage, allPages, hasMorePage } = pagesControl;

  useEffect(() => {
    getTrendingMovies();
  }, []);

  function getTrendingMovies() {
    if (currentPage > allPages) {
      toast.error(`There are no pages left`);
      setPagesControl(prev => ({ ...prev, hasMorePage: false }));
      return;
    }
    api
      .fetchTrendingMovies(currentPage)
      .then(data => {
        setPagesControl(prev => ({
          ...prev,
          currentPage: prev.currentPage + 1,
          allPages: data.total_pages,
        }));
        setMovies(prev => [...prev, ...data.results]);
      })
      .catch(({ message }) => console.log(message));
  }

  return (
    <>
      <InfiniteScroll
        className="InfiniteScroll"
        dataLength={movies.length}
        next={getTrendingMovies}
        hasMore={hasMorePage}
        loader={<LoaderSpinner />}
      >
        {!!movies.length && <MoviesGallery MoviesData={movies} />}
      </InfiniteScroll>
    </>
  );
}
