import axios from 'axios';
import {
  TICKET_SUMMARY_COUNT,
  SET_ALERT,
  TICKETS_VIEW_ALL,
  VIEW_TICKET
} from './types';
import { setAlert } from './alert';

export const saveTicket = (ticketID, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    //add the ticketID if given into the formData
    ticketID.length > 0 && (formData.ticketID = ticketID);

    const res = await axios.post('/api/tickets/', formData, config);
    dispatch(setAlert('Ticket Saved Successfully', 'success'));

    history.push('/viewtickets'); //client redirect through the history object
  } catch (err) {
    dispatch({
      type: SET_ALERT,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const addCommentToTicket = (ticketID, formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.post(
      `/api/tickets/comment/${ticketID}`,
      formData,
      config
    );

    dispatch({
      type: VIEW_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ALERT,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export const ticketSummaryCount = () => async dispatch => {
  try {
    const res = await axios.get('/api/tickets/statusSummary');
    dispatch({
      type: TICKET_SUMMARY_COUNT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ALERT,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const ticketsViewAll = () => async dispatch => {
  const res = await axios.get('/api/tickets/viewAllTickets');
  dispatch({
    type: TICKETS_VIEW_ALL,
    payload: res.data
  });
  try {
  } catch (err) {
    dispatch({
      type: SET_ALERT,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

export const viewTicketGet = id => async dispatch => {
  try {
    const res = await axios.get(`/api/tickets/viewTicket/${id}`);
    dispatch({
      type: VIEW_TICKET,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ALERT,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
