import React, { useEffect, useState, lazy, Suspense } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';

import LoaderSpinner from '../components/LoaderSpinner/LoaderSpinner';
import MovieCard from '../components/MovieCard/MovieCard';

import api from '../utils/ApiServices';

const Cast = lazy(() =>
  import('../components/Cast/' /* webpackChunkName: "cast-subpage" */),
);
const Reviews = lazy(() =>
  import('../components/Reviews/' /* webpackChunkName: "reviews-subpage" */),
);

export default function MovieDetailsPage() {
  const { path } = useRouteMatch();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    api
      .fetchMovieById(movieId)
      .then(setMovie)
      .catch(({ message }) => console.log(message));
  }, [movieId]);

  return (
    <>
      {movie && <MovieCard movie={movie} />}
      <Suspense fallback={<LoaderSpinner />}>
        <Route path={`${path}/cast`}>{movie && <Cast />}</Route>
        <Route path={`${path}/reviews`}>{movie && <Reviews />}</Route>
      </Suspense>
    </>
  );
}
