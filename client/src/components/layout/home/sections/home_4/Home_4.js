import React, { useState, useEffect } from 'react';
import VizSensor from 'react-visibility-sensor';

import './Home_4.css';

const Home_4 = props => {
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
    <section className='h_sec_4'>
      <VizSensor onChange={onChange} partialVisibility>
        <div className='centerContainer'>
          <div className={animatedOnce ? 'a txt postAnim1' : 'a txt preAnim'}>
            <div>
              <i className='fab fa-earlybirds fa-7x'></i>
              <br />
              <h1>EARLY BIRD</h1>
              The key to solving technology problems, is hard work, and shear
              man hours.
            </div>
          </div>
          <div className={animatedOnce ? 'b pic postAnim1 ' : 'b pic preAnim'}>
            &nbsp;
          </div>
          <div className={animatedOnce ? 'c txt postAnim2' : 'c txt preAnim'}>
            <div>
              <i className='fas fa-headphones fa-7x'></i>
              <br />
              <h1>MUSIC HELPS</h1>
              The sounds of motown south our soul, so we can tackle the most
              random of computer issues.
            </div>
          </div>
          <div className={animatedOnce ? 'd pic postAnim2 ' : 'd pic preAnim'}>
            &nbsp;
          </div>

          <div className={animatedOnce ? 'e pic postAnim3 ' : 'e pic preAnim'}>
            &nbsp;
          </div>
          <div className={animatedOnce ? 'f txt postAnim3' : 'f txt preAnim'}>
            <div>
              <i className='fas fa-mug-hot fa-7x'></i>
              <br />
              <h1>CAFFEINE</h1>
              The life blood of every professional, something we all have in
              common!
            </div>
          </div>
          <div className={animatedOnce ? 'g pic postAnim4 ' : 'g pic preAnim'}>
            &nbsp;
          </div>
          <div className={animatedOnce ? 'h txt postAnim4' : 'h txt preAnim'}>
            <div>
              <i className='fas fa-plug fa-7x'></i>
              <br />
              <h1>PLUGGED IN?</h1>
              Sound silly really, but you would be suprised how often it
              happens.
            </div>
          </div>
        </div>
      </VizSensor>
    </section>
  );
};

export default Home_4;
