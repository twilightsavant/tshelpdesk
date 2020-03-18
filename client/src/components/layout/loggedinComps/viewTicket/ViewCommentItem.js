import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';

const ViewCommentItem = ({ auth, user, ticketID, com }) => {
  return (
    <div className='replyTicket'>
      <div className='tic_header'>
        <div className='ticAvatar'>
          <i className='fas fa-user fa-2x'></i>
        </div>
        <div className='ticUser'>
          <h4>{user.name}</h4>
          <span className='font12'>
            {user.department}
            {user.department && user.position && ' - '}
            {user.position}
          </span>
        </div>
        <div className='ticDate font12'>
          <Moment format='MM/DD/YYYY hh:mm a'>{com.createdDate}</Moment>
        </div>
      </div>
      <div className='tic_body'>{com.comment}</div>
    </div>
  );
};

ViewCommentItem.propTypes = {
  com: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  ticketID: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ViewCommentItem);
