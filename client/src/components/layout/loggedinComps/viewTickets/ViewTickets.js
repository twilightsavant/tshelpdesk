import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../../Spinner';
import { ticketsViewAll } from '../../../../actions/tickets';

import YourInfo from './../leftBar/YourInfo';
import TicketCount from './../leftBar/TicketCount';
import './../loggedIn.css';
import './ViewTickets.css';

const ViewTickets = ({
  auth,
  tickets: { allTickets, loading },
  ticketsViewAll
}) => {
  useEffect(() => {
    ticketsViewAll();
  }, [ticketsViewAll]);

  return (
    <div className='loggedInComps'>
      <div className='centerContainer'>
        <div className='leftBar'>
          <div className='mobile_no'>
            <YourInfo />
          </div>
          <TicketCount />
        </div>
        <div className='rightBar'>
          {loading ? (
            <div className='justifyCenter'>
              <Spinner />
            </div>
          ) : (
            <Fragment>
              <div className='titleDiv'>
                <span className='color_blue font24 bold'>Support Tickets</span>
                Your ticket history
              </div>
              <div>
                <table width='99%' className='viewTickets_table'>
                  <thead>
                    <tr>
                      <td className='subject_head'>Subject</td>
                      <td className='priority_head'>Priority</td>
                      <td className='status_head'>Status</td>
                      <td className='updated_head'>Last Updated</td>
                    </tr>
                  </thead>
                  <tbody>
                    {allTickets.length > 0 ? (
                      allTickets.map(tic => (
                        <TicketItem auth={auth} tic={tic} key={tic._id} />
                      ))
                    ) : (
                      <tr>
                        <td colSpan='4'>No Tickets Found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const TicketItem = ({
  auth,
  tic: {
    _id,
    subject,
    priority,
    answered,
    closed,
    lastActivity,
    locked,
    topic,
    viewedBy
  }
}) => {
  let viewed = '1';
  if (ViewedByMe(viewedBy, auth)) {
    viewed = '0';
  }
  return (
    <tr>
      <td
        className='subject'
        viewed={viewed}
        onClick={e => (window.location.href = `viewticket/${_id}`)}
      >
        <h1>{subject}</h1>
        Topic: {topic}
      </td>
      <td
        className='priority'
        onClick={e => (window.location.href = `viewticket/${_id}`)}
      >
        <i className={`fas fa-thermometer-half ${Priority(priority)}`}></i>
      </td>
      <td
        className='status'
        onClick={e => (window.location.href = `viewticket/${_id}`)}
      >
        {Status(answered, closed)}
      </td>
      <td
        className='updated'
        onClick={e => (window.location.href = `viewticket/${_id}`)}
      >
        <div className='font12'>
          <Moment format='MM/DD/YYYY'>{lastActivity}</Moment>
        </div>
        <div className='font13'>
          <Moment format='h:mm A'>{lastActivity}</Moment>
        </div>
      </td>
    </tr>
  );
};

const ViewedByMe = (viewedBy, auth) => {
  if (
    auth.user &&
    viewedBy.length > 0 &&
    viewedBy.some(view => view.user === auth.user._id)
  ) {
    return true;
  }

  return false;
};

const Status = (answered, closed) => {
  console.log(answered);
  if (closed) {
    return <div className='statusDiv closed'>Closed</div>;
  } else if (answered) {
    return <div className='statusDiv answered'>Answered</div>;
  } else {
    return <div className='statusDiv notAnswered'>Not Answered</div>;
  }
};

const Priority = num => {
  if (num === 2) {
    return 'color_red blinking';
  } else if (num === 1) {
    return 'color_green';
  } else {
    return 'color_blue';
  }
};

ViewTickets.propTypes = {
  auth: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth, tickets: state.tickets });

export default connect(mapStateToProps, { ticketsViewAll })(ViewTickets);
