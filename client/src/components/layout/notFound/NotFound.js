import React from 'react';

import errorImg from './404.jpg';

const NotFound = props => {
  return (
    <div className='notFound404Div textcenter'>
      <img className='blinking' src={errorImg} />
    </div>
  );
};

export default NotFound;
