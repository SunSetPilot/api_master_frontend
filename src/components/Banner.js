import React from 'react';
import styles from './index.less';

export default function Banner() {
  return (
    <React.Fragment>
      <div className={styles.background}>
        <h1 className={styles.title}>Welcome to API-MASTER</h1>
        <p className={styles.description}>This is a platform for managing project APIs and supports the batch import of project APIs which is convenient for users to manage.</p>
      </div>
    </React.Fragment>
  )
}
