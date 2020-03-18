import React from 'react';

import './NavDrawerBtn.css';

const NavDrawerBtn = props => {
  return (
    <div className='navDrawerBtn' onClick={props.click}>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
      <div>&nbsp;</div>
    </div>
  );
};

export default NavDrawerBtn;
