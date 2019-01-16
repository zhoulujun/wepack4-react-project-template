/**
 *@author Create by zhoulujun.cn on 1/4/1910:30 AM
 *@version 1.0.0
 */


//页面样式
import './styles/index.scss';

//公用方法
import Untils from './untils/Untils';

import React from "react";
import {render} from "react-dom";
import { Router,useRouterHistory,hashHistory} from 'react-router';
import { createHistory,createHashHistory, useBeforeUnload } from 'history'
import {Provider} from 'react-redux';


import configStore from  './stores/store';//生产模式
import rootRouter from './router/router';

window.appHistory = createHashHistory({
  basename: '', // The base URL of the app (see below)
  hashType: 'slash', // The hash type to use (see below)
  // A function to use to confirm navigation with the user (see below)
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});


const store = configStore();

render((
    <Provider store={store}>
      <Router history={window.appHistory} routes={rootRouter}/>
    </Provider>
  ),
  document.getElementById('app')
);


