import { lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';

import Appbar from './components/AppBar/AppBar';
import Container from './components/Container';
import LoaderSpinner from './components/LoaderSpinner/LoaderSpinner';

import 'react-toastify/dist/ReactToastify.css';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./pages/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './pages/MovieDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage' /* webpackChunkName: "not-found-page" */),
);

export default function App() {
  return (
    <Container>
      <Appbar />

      <Suspense fallback={<LoaderSpinner />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
