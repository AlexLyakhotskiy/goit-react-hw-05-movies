import React from 'react';
import MoviesGalleryItem from './MoviesGalleryItem/MoviesGalleryItem';

import styles from './MoviesGallery.module.scss';

export default function MoviesGallery({ MoviesData }) {
  return (
    <ul className={styles.list}>
      {MoviesData.map(
        ({ id, poster_path, title, vote_average, release_date }, idx) => (
          <MoviesGalleryItem
            key={idx}
            id={id}
            poster={poster_path}
            title={title}
            vote={vote_average}
            release={release_date}
          />
        ),
      )}
    </ul>
  );
}
