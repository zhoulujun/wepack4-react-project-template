require('es6-promise').polyfill();
require('isomorphic-fetch');

/**
 * 数据字典
 * **/

//获取产品信息
export function queryPublicDataDic() {
    return (dispatch) => {

        dispatch({type: 'MASK'});

        /**
         *REPAYMENTSTATUS  近期应还
         *LOANSTATUS 我的贷款
         * LOANDETAILSTATUS 贷款详情
         * REPAYTYPE 还款历史
         * SIGNSTATUS 还款卡管理
         * RATETYPE 我的贷款 年月日
         * */


        fetch('/cfs-api/api/common/queryPublicDataDic', {
            credentials: 'include'
        }).then(res => {
            console.log(res);
            return res.json();
        }).then(data => {
            if (data.code === '200') {
                let myData = data.data;
                dispatch({type: 'RELOAD_PUBLIC_DATA_DIC', publicDataDic: myData});
            } else {
              console.log('cc');

            }
            dispatch({type: 'UNMASK'})
        }).catch(e => {
            console.log(e);
            dispatch({type: 'UNMASK'})
        })
    };
}
