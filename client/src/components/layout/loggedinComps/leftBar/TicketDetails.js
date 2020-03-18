import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../../Spinner';
import './TicketDetails.css';

const TicketDetails = ({ tickets: { loading, viewTicket } }) => {
  return (
    <div className='outer_box_rad leftBar_TicketDetails'>
      <div className='titleDiv'>
        <i className='fas fa-ticket-alt'></i> Ticket Infomration
      </div>
      <div className='contDiv'>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            <li>
              <h1>{viewTicket.subject}</h1>
              <span className='closedStatus'>
                {viewTicket.closed ? 'closed' : 'open'}
              </span>
            </li>
            <li>
              <h2>Topic</h2>
              {viewTicket.topic}
            </li>
            <li>
              <h2>Submitted On</h2>
              <Moment format='MM/DD/YYYY'>{viewTicket.createdDate}</Moment>
              <br />
              <span className='font12'>
                <Moment format='hh:mm a'>{viewTicket.createdDate}</Moment>
              </span>
            </li>
            <li>
              <h2>Created By</h2>
              {viewTicket.userName}
            </li>
            <li>
              <h2>Last Activity</h2>
              <Moment format='MM/DD/YYYY'>{viewTicket.lastActivity}</Moment>
              <br />
              <span className='font12'>
                <Moment format='hh:mm a'>{viewTicket.lastActivity}</Moment>
              </span>
            </li>
            <li>
              <h2>Priority</h2>
              <Priority num={viewTicket.priority} />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

const Priority = ({ num }) => {
  if (num >= 2) {
    return 'High';
  } else if (num > 0) {
    return 'Normal';
  } else {
    return 'Low';
  }
};

TicketDetails.propTypes = {
  tickets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  tickets: state.tickets
});

export default connect(mapStateToProps)(TicketDetails);
