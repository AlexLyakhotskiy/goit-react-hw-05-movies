import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const history = useHistory();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error('Please enter query');
    }

    history.push({ ...location, search: `query=${searchQuery}` });
  };

  return (
    <div className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <input
          onChange={onInputChange}
          value={searchQuery}
          className={styles.SearchFormInput}
          name="searchQuery"
          type="text"
          autoComplete="off"
          autoFocus
        />
        <button type="submit" className={styles.SearchFormButton}>
          Search
        </button>
      </form>
    </div>
  );
}
