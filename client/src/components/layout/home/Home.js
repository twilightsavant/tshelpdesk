import React, { Fragment } from 'react';

import Home1 from './sections/home_1/Home_1';
import Home2 from './sections/home_2/Home_2';
import Home3 from './sections/home_3/Home_3';
import Home4 from './sections/home_4/Home_4';
import Home5 from './sections/home_5/Home_5';

const Home = props => {
  return (
    <Fragment>
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
      <Home5 />
    </Fragment>
  );
};

export default Home;
