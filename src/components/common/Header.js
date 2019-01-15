import React from 'react';
import './Header.scss';

import {Router, Route, Link, hashHistory} from 'react-router';


class Header extends React.Component {

  render () {
    const {title, rightName, rightFn, showBack, isIcon, claName, backBsId} = this.props;

    return <header>
      <div className='header'>
        <div className='aside back' id={backBsId} onClick={this.goBack.bind(this, backBsId)}>
          回退
        </div>
        <div className='title' id={backBsId}>{title}</div>
        <div className={isIcon ? 'hide' : 'aside right'} onClick={rightFn}>
          {rightName}
        </div>
        <div className={isIcon ? 'aside right' : 'hide'} onClick={rightFn}>
          <i className='icon-font icon-right-arrow'></i>
        </div>
      </div>
    </header>;
  }
  goBack(backBsId){
    console.log(backBsId);
  }



}









export default Header;
