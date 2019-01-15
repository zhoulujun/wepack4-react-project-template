require('es6-promise').polyfill();
require('isomorphic-fetch');
//系统常量
import CONST from '../untils/const';

export function undateLoanIndexLoanDatas(loanDatas) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_LOANINDEX_LOANDATAS',
            loanDatas
        })
    }
}

//可贷额度查询
export function getIndexLoanDatas() {
    return (dispatch) => {
        dispatch({type: 'MASK'});

        fetch('/cfs-api/api/loans/index', {
            credentials: 'include'
        }).then((res) => {
            return res.json();
        }).then((datas) => {
            if (datas.code === '200') {
                dispatch(undateLoanIndexLoanDatas(datas.data));
            } else {
              console.log(datas);
            }
            dispatch({type: 'UNMASK'})
        }).catch((e) => {
            console.log(e);
            dispatch({type: 'UNMASK'})
        })
    };
}




