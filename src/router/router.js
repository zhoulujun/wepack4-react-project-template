import React from 'react';
import InsideContainer from '../containers/InsideContainer';
import LoanIndexContainer from '../containers/LoanIndexContainer';

//router
const rootRouter = {
  childRoutes: [{
    path: '/',
    component: InsideContainer,
    childRoutes: [
      {
        path: 'home',
        component: LoanIndexContainer,
      }
    ]
  }]
};

export default rootRouter;
