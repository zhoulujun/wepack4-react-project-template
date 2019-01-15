'use strict';
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import immutable from 'immutable';
require('es6-promise').polyfill();


import * as LoanIndexActions from '../actions/LoanIndexActions';

import Header from '../components/common/Header';
import './LoanIndex.scss';


function mapStateToProps(state) {
    return {
        loanIndex: state.loanIndexDatas.get('loanDatas'),

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(LoanIndexActions, dispatch);
}

class LoanIndex extends React.Component {
    constructor(props) {
        super(props);
        this.props.getIndexLoanDatas();
    }

    componentDidUpdate() {

    }


    render() {

        let {advertising,loanableCredit,showHistory} = this.props.loanIndex;

        return <div className='main-container'>
            <Header title="test" backBsId='index'/>
            <div>
              <img src={require('../images/logo_my.png')}/>
              demo
            </div>
        </div>
    }



}

const LoanIndexContainer = connect(mapStateToProps, mapDispatchToProps)(LoanIndex);

export default LoanIndexContainer;


