import {combineReducers} from 'redux';

import global from './globalReducers';
import {loanIndexDatas} from './LoanIndexReducers';


export default combineReducers({
  global,
  loanIndexDatas
});
