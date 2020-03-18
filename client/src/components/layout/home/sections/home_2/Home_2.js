import React from 'react';

import './Home_2.css';

//@ TODO
// Break quotes out into a component that slideshows with multiple quotes
// Other quotes can be found in the PSD Mockup

const Home_2 = props => {
  return (
    <section className='h_sec_2'>
      <div className='centerContainer bgDiv delayFadeIn'>
        <div className='content'>
          <div>
            <h1 className='font22 bold'>WE CAN'T EVEN MAKE THIS UP:</h1>
            <div className='font14'>
              <i>
                “User spilled coffee inside of his desktop PC. Reason? He
                thought the CD tray was a cup holder.”
              </i>
            </div>
            <div className='font14 bold'>-Gene Driscus</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home_2;
