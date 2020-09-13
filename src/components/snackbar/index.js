import React from 'react';
import clsx from 'clsx';

import { SNACK_TYPE } from '../../utilities/constants';
import styles from './index.module.css';

const Snackbar = ({ type, message }) => {
  let customStyles;
  let icon;

  switch (type) {
    case SNACK_TYPE.SUCCESS: {
      customStyles = styles.successContainer;
      icon = 'fas fa-check'
      break;
    }

    case SNACK_TYPE.FAILURE: {
      customStyles = styles.errorContainer;
      icon = 'fas fa-times'
      break;
    }

    default:
      customStyles = null;
      icon = 'fas fa-times'
  }

  return (
    <div className={clsx([styles.container, customStyles])}>
      <p className={styles.containerText}>
        <i className={clsx([icon, 'button-icon'])} />
        {message}
      </p>
    </div>
  )
}

export default Snackbar;
