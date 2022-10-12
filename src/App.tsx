import React, { useState } from 'react';
import './scss/app.scss';
import { Header } from './components';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';
import { EMPTY_STRING, ROUTE_TO_HOME, ROUTE_TO_PAGE_NOT_FOUND } from './common/constants';


export const App = () => {
  const [searchValue, setSearchValue] = useState(EMPTY_STRING);

  return (
    <div className='wrapper'>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className='content'>

        <Routes>
          {
            publicRoutes.map((rout, index) => <Route key={index} path={rout.path}
                                                     element={<rout.Component
                                                       searchValue={searchValue} />} />)
          }
          <Route path={'/'} element={<Navigate to={ROUTE_TO_HOME} />} />
          <Route path={'*'} element={<Navigate to={ROUTE_TO_PAGE_NOT_FOUND} />} />
        </Routes>
      </div>

    </div>
  );
};