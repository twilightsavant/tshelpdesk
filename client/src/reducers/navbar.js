import { NAVBAR_OPEN, NAVBAR_CLOSED } from '../actions/types';

const initialState = {
  navbarDisplay: false
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case NAVBAR_OPEN:
      return { ...state, display: true };
    case NAVBAR_CLOSED:
      return { ...state, display: false };
    default:
      return state;
  }
}
