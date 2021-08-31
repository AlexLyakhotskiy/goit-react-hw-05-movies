import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import sprite from '../../../icons/sprite.svg';
import defaultImage from '../../../images/default.jpg';

import styles from './MoviesGalleryItem.module.scss';

export default function MoviesGalleryItem({
  id,
  poster,
  title,
  vote,
  release,
}) {
  const location = useLocation();
  return (
    <li className={styles.item}>
      <Link
        className={styles.link}
        to={{ pathname: `/movies/${id}`, state: { from: location } }}
      >
        <div className={styles.voteWrapper}>
          <p className={styles.voteText}>{vote}</p>
          <svg className={styles.icon} height="16" width="16">
            <use href={sprite + '#star'} />
          </svg>
        </div>
        <div className={styles.imgWrapper}>
          <img
            src={
              poster ? `https://image.tmdb.org/t/p/w300${poster}` : defaultImage
            }
            alt={title}
          />
        </div>
        <div className={styles.contentWrapper}>
          <h3>{`${title} (${release ? release.slice(0, 4) : 'Unknown'})`}</h3>
        </div>
      </Link>
    </li>
  );
}

MoviesGalleryItem.propTypes = {
  id: PropTypes.number,
  poster: PropTypes.string,
  title: PropTypes.string,
  vote: PropTypes.number,
  release: PropTypes.string,
};
