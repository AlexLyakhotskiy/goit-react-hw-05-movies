import { Link, NavLink, useLocation, useRouteMatch } from 'react-router-dom';

import sprite from '../../icons/sprite.svg';
import defaultImage from '../../images/default.jpg';

import styles from './MovieCard.module.scss';

export default function MovieCard({ movie }) {
  const { url } = useRouteMatch();
  const location = useLocation();

  return (
    <>
      <Link className={styles.goBackBtn} to={location?.state?.from ?? '/'}>
        <svg className={styles.goBackBtn__icon} width="14px" height="14px">
          <use href={sprite + '#arrow-left'} />
        </svg>
        Go back
      </Link>
      <div className={styles.card}>
        <div className={styles.imgWrapper}>
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : defaultImage
            }
            alt={movie.title}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>{`${
            movie.title
          } (${movie.release_date.slice(0, 4)})`}</h3>
          <p className={styles.description}>
            <span className={styles.descriptionSpan}>Description:</span>
            {movie.overview}
          </p>
          <p className={styles.genresTitle}>Genres:</p>
          <ul className={styles.genresList}>
            {movie.genres.map(({ name }) => (
              <li key={name} className={styles.genresList__item}>
                <p>{name}</p>
              </li>
            ))}
          </ul>
          <div className={styles.voteWrapper}>
            <p className={styles.vote}>
              <span className={styles.voteSpan}>Vote averege: </span>
              {movie.vote_average}
            </p>{' '}
            <svg className={styles.icon} height="20" width="20">
              <use href={sprite + '#star'} />
            </svg>
          </div>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to={{
              pathname: `${url}/cast`,
              state: { from: location?.state?.from },
            }}
          >
            Cast
          </NavLink>
          <NavLink
            className={styles.navLink}
            activeClassName={styles.activeNavLink}
            to={{
              pathname: `${url}/reviews`,
              state: { from: location?.state?.from },
            }}
          >
            Reviews
          </NavLink>
        </div>
      </div>
    </>
  );
}
