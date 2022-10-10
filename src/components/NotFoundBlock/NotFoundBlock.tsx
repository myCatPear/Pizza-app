import React from 'react';
import style from './NotFoundBlock.module.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTE_TO_HOME } from 'common/constants';

export const NotFoundBlock = () => {
  const navigate = useNavigate();
  const onBackToHomeButtonClick = () => navigate(ROUTE_TO_HOME);
  return (
    <div className={style.root}>
      <span>='(</span>
      <h1>
        Ничего не найдено
      </h1>
      <p className={style.description}>
        К сожалению, данная страница отсутвует в нашем магазине
      </p>
      <button
        className={style.button}
        onClick={onBackToHomeButtonClick}
      >На главную
      </button>
    </div>

  );
};