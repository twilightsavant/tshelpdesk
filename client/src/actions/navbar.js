import { NAVBAR_OPEN, NAVBAR_CLOSED } from './types';

export const openNavBar = () => dispatch => {
  console.log('booyeah');
  dispatch({ type: NAVBAR_OPEN });
};

export const closeNavBar = () => dispatch => {
  dispatch({ type: NAVBAR_CLOSED });
};
