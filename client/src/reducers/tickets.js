import {
  TICKET_SUMMARY_COUNT,
  TICKETS_VIEW_ALL,
  VIEW_TICKET
} from '../actions/types';

const initialState = {
  loading: true,
  ticketSummary: {},
  allTickets: {},
  viewTicket: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case TICKET_SUMMARY_COUNT:
      return {
        ...state,
        loading: false,
        ticketSummary: payload
      };
    case TICKETS_VIEW_ALL:
      return {
        ...state,
        loading: false,
        allTickets: payload
      };
    case VIEW_TICKET:
      return {
        ...state,
        loading: false,
        viewTicket: payload
      };
    default:
      return state;
  }
}
