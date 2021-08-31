import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/ApiServices';

import styles from './Reviews.module.scss';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    api
      .fetchMovieReviews(movieId)
      .then(({ results }) => setReviews(results))
      .catch(({ message }) => console.log(message));
  }, [movieId]);
  return (
    <>
      {!!reviews?.length ? (
        <ul className={styles.list}>
          {reviews &&
            reviews.map(({ author_details, content }, idx) => (
              <li key={idx} className={styles.item}>
                <h3 className={styles.title}>{author_details.username}</h3>
                <p>{content}</p>
              </li>
            ))}
        </ul>
      ) : (
        <p>We don't have any reviews for this movie</p>
      )}
    </>
  );
}
