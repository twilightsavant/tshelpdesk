import axios from 'axios';
import { GET_PROFILE, CLEAR_PROFILE, PROFILE_ERROR } from './types';

export const loadProfile = () => async dispatch => {
  try {
    const res = await axios.get('api/users');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({ type: CLEAR_PROFILE });

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
