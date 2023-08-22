import React from 'react';

import style from './spinner.module.scss';

type Properties = {
  isFullScreen?: boolean;
};

const Spinner: React.FC<Properties> = ({ isFullScreen = false }) =>
  isFullScreen ? (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.loader}>Loading...</div>
      </div>
    </div>
  ) : (
    <div className={style.container}>
      <div className={style.loader}>Loading...</div>
    </div>
  );

export { Spinner };
