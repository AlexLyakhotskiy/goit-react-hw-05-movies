import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import defaultImage from '../../images/default.jpg';

import api from '../../utils/ApiServices';

import styles from './Cast.module.scss';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    api
      .fetchMovieCast(movieId)
      .then(({ cast }) => setCast(cast))
      .catch(({ message }) => console.log(message));
  }, [movieId]);
  return (
    <>
      {!!cast?.length ? (
        <ul className={styles.list}>
          {cast.map(({ character, name, profile_path }, idx) => (
            <li key={idx} className={styles.item}>
              <div className={styles.imgWrapper}>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w300${profile_path}`
                      : defaultImage
                  }
                  alt={name}
                />
              </div>
              <div className={styles.contentWrapper}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.character}>{character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>We don't have any cast for this movie</p>
      )}
    </>
  );
}
