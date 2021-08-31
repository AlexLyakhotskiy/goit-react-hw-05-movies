import React from 'react';

import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.scss';

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const onInputChange = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      return toast.error('Please enter query');
    }
    onSubmit(searchQuery);
    setSearchQuery('');
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
