import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

import Spinner from '../../Spinner';
import ViewCommentItem from './ViewCommentItem';
import CommentItemForm from './CommentItemForm';
import { viewTicketGet } from '../../../../actions/tickets';
import TicketDetails from '../leftBar/TicketDetails';

import './ViewTicket.css';

const ViewTicket = ({
  viewTicketGet,
  auth,
  tickets: { loading, viewTicket },
  match
}) => {
  useEffect(() => {
    viewTicketGet(match.params.id);
  }, [viewTicketGet, match.params.id]);

  return (
    <div className='loggedInComps'>
      <div className='centerContainer flexColumn'>
        <div className='leftBar'>
          <TicketDetails />
        </div>
        <div className='rightBar'>
          {loading ? (
            <div className='justifyCenter'>
              <Spinner />
            </div>
          ) : (
            <Fragment>
              <div className='ticketTitleDiv'>
                <div className='titleDiv'>
                  <span className='color_blue font24 bold'>View Ticket</span>
                  Help Desk Ticket
                </div>
              </div>
              <div className='viewTicket'>
                <div className='origTicket'>
                  <div className='tic_header'>
                    <div className='ticAvatar'>
                      <i className='fas fa-user fa-2x'></i>
                    </div>
                    <div className='ticUser'>
                      <h4>{viewTicket.userName}</h4>
                      <span className='font12'>
                        {viewTicket.userDepartment}
                        {viewTicket.userDepartment &&
                          viewTicket.userPosition &&
                          ' - '}
                        {viewTicket.userPosition}
                      </span>
                    </div>
                    <div className='ticDate font12'>
                      <Moment format='MM/DD/YYYY hh:mm a'>
                        {viewTicket.createdDate}
                      </Moment>
                    </div>
                  </div>
                  <div className='tic_body'>
                    <div className='bold'>Subject: {viewTicket.subject}</div>
                    <br />
                    {viewTicket.message}
                  </div>
                </div>
                {typeof viewTicket.comments != 'undefined' &&
                  viewTicket.comments.map(com => {
                    let user = UserInfo(com.user, viewTicket.userInfo);
                    return (
                      <ViewCommentItem
                        com={com}
                        user={user}
                        ticketID={viewTicket._id}
                        key={com._id}
                      />
                    );
                  })}
                <CommentItemForm ticketID={viewTicket._id} />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

const UserInfo = (_id, userInfo = {}) => {
  let match = [];

  if (userInfo.length > 0) {
    match = userInfo.find(u => u._id === _id, userInfo);
  }

  return match;
};

ViewTicket.propTypes = {
  viewTicketGet: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tickets: state.tickets
});

export default connect(mapStateToProps, { viewTicketGet })(ViewTicket);
