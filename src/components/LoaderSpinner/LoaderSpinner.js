import Loader from 'react-loader-spinner';

import styles from './LoaderSpinner.module.scss';

const LoaderSpinner = () => {
  return (
    <div className={styles.container}>
      <Loader type="Oval" color="#2196f3" height={80} width={80} />
    </div>
  );
};

export default LoaderSpinner;
