import React from 'react';
import styles from './index.less';

export default function Banner() {
  return (
    <React.Fragment>
      <div className={styles.background}>
        <h1 className={styles.title}>Welcome to API-MASTER</h1>
        <p>Welcome to API-MASTER, this is a description of this platform.</p>
      </div>
    </React.Fragment>
  )
}
