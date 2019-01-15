import { Map} from 'immutable';

let initLoanIndexDatas = Map({
  loanDatas: {
    'advertising': '',
    'amt': '',
    'loanPeriod': '',
    'rate': '',
    'rateType': '2',
    'repaymentMethod': '',
    'showHistory': 'Y'
  }
});


let initLoanIndexRepayDatas = Map({
  repayDatas: {
    'queryTime': '',
    'recentRepayment': null,
    'totalCount': 0,
    'totalAmt': 0,
    'runOnly': false
  }
});


export function loanIndexDatas (state = initLoanIndexDatas, action = {}) {
  switch (action.type) {
    case 'UPDATE_LOANINDEX_LOANDATAS':
      state = state.set('loanDatas', action.loanDatas);
      return state;
    default :
      return state;
  }
}


export function loanIndexRepayDatas (state = initLoanIndexRepayDatas, action = {}) {
  switch (action.type) {
    case 'UPDATE_LOANINDEX_REPAYDATAS':
      state = state.set('repayDatas', action.repayDatas);
      return state;
    default :
      return state;
  }
}
