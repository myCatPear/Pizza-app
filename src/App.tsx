import React, { createContext, useEffect, useState } from 'react';
import './scss/app.scss';
import { Header } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { EMPTY_STRING, ROUTE_TO_HOME, ROUTE_TO_PAGE_NOT_FOUND } from './common/constants';

export const App = () => {

  return (
    <div className='wrapper'>
        <Header />
        <div className='content'>
          <Routes>
            {
              publicRoutes.map((rout, index) => <Route key={index} path={rout.path}
                                                       element={<rout.Component />} />)
            }
            <Route path={'/'} element={<Navigate to={ROUTE_TO_HOME} />} />
            <Route path={'*'} element={<Navigate to={ROUTE_TO_PAGE_NOT_FOUND} />} />
          </Routes>
        </div>
    </div>
  );
};