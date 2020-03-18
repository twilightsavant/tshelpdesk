import React, { useState, useEffect } from 'react';
import VizSensor from 'react-visibility-sensor';

import './Home_3.css';

const Home_3 = props => {
  const [animate, setAnimate] = useState(false);
  const [animatedOnce, setAnimatedOnce] = useState(false);

  const onChange = isVisible => {
    if (!animatedOnce && isVisible) {
      setAnimate(true);
    }
  };

  useEffect(() => {
    if (!animatedOnce && animate) {
      setAnimatedOnce(true);
    }
  }, [animate, animatedOnce]);

  return (
    <section className='h_sec_3'>
      <VizSensor onChange={onChange} partialVisibility>
        <div className={animatedOnce ? 'postFadeIn' : 'preFadeIn'}>
          <div className='centerContainer bgDiv'>
            <div className='content'>
              <h1>Deadline Approaching?</h1>
              <h2>Computer Problems?</h2>
              <h3>
                You may be a wiz at excel, effective at reports and maybe even
                good on the phones. But can you handle the latest windows update
                that frags your entire hard drive without missing a deadline?
              </h3>
              <div className='rndDis'>
                <span className='rndDisNum'>51</span>{' '}
                <span className='rndDisDesc'>Problems Solved</span>
              </div>
              <div className='rndDis'>
                <span className='rndDisNum'>10</span>{' '}
                <span className='rndDisDesc'>Unsolved Mysteries</span>
              </div>
            </div>
          </div>
        </div>
      </VizSensor>
    </section>
  );
};

export default Home_3;
