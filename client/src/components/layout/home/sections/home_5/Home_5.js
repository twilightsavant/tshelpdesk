import React, { useState, useEffect } from 'react';
import VizSensor from 'react-visibility-sensor';

import './Home_5.css';
import employee1 from './employee_1.jpg';
import employee2 from './employee_2.jpg';
import employee3 from './employee_3.jpg';

const Home_5 = props => {
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
    <section className='h_sec_5'>
      <VizSensor onChange={onChange} partialVisibility>
        <div
          className={
            animatedOnce
              ? 'centerContainer postAnim'
              : 'centerContainer preAnim'
          }
        >
          <h1>IT Department</h1>
          <div className='employees'>
            <div className='emp'>
              <img src={employee1} alt='Johnny Doe' />
              <h2>JOHNNY DOE</h2>
              DEPARTMENT MANAGER
            </div>
            <div className='emp'>
              <img src={employee2} alt='Douglas Y2K' />
              <h2>DOUGLAS Y2K</h2>
              LEAD TECHNICIAN
            </div>
            <div className='emp'>
              <img src={employee3} alt='Jenny Lillian' />
              <h2>JENNY LILLIAN</h2>
              INTERN
            </div>
          </div>
        </div>
      </VizSensor>
    </section>
  );
};

export default Home_5;
