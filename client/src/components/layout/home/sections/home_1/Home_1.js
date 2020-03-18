import React from 'react';

import './Home_1.css';
import guyBG_desktop from './guyBG_desktop.png';

const Home_1 = props => {
  return (
    <section className='h_sec_1'>
      <div className='centerContainer bgDiv fadeInBottom'>
        <div className='content'>
          <img src={guyBG_desktop} alt='Help Desk' className='desktop' />
          <div>
            <h2 className='bold'>HELPING YOU GET</h2>
            <h3 className='bold900'>BACK TO WORK</h3>
            <h4 className='bold'>NO SERIOUSLY...</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home_1;
