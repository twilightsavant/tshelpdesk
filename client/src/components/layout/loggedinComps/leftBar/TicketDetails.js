import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../../Spinner';
import './TicketDetails.css';

const TicketDetails = ({ auth, tickets: { loading, viewTicket } }) => {
  return (
    <div className='outer_box_rad leftBar_TicketDetails'>
      <div className='titleDiv'>
        <i className='fas fa-ticket-alt'></i> Ticket Infomration
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className='contDiv'>
          <ul>
            <li>
              <h1>{viewTicket.subject}</h1>
              <span
                className={
                  viewTicket.closed
                    ? 'closedStatus closed'
                    : 'closedStatus open'
                }
              >
                {viewTicket.closed ? 'Ticket Closed' : 'Ticket Open'}
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
        </div>
      )}
      {showEditButton(auth, viewTicket)}
    </div>
  );
};

/*
{auth.user._id === viewTicket.user && viewTicket.comments == null && (
  <div
    className='btn edit'
    onClick={e =>
      (window.location.href = `/editticket/${viewTicket._id}`)
    }
    style={{ marginTop: '20px' }}
  >
    <i className='fas fa-wrench'> </i> Edit Your Help Ticket
  </div>
)}
*/

const showEditButton = (auth, viewTicket) => {
  if (auth.user._id === viewTicket.user) {
    if (viewTicket.comments && viewTicket.comments.length > 0) {
      //there are comments
    } else {
      return (
        <div
          className='btn edit'
          onClick={e =>
            (window.location.href = `/editticket/${viewTicket._id}`)
          }
          style={{ marginTop: '20px' }}
        >
          <i className='fas fa-wrench'> </i> Edit Your Help Ticket
        </div>
      );
    }
  }
  return '';
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
  tickets: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tickets: state.tickets
});

export default connect(mapStateToProps)(TicketDetails);
