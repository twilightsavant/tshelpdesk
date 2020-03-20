import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCommentToTicket } from '../../../../actions/tickets';

const CommentItemForm = ({ ticketID, addCommentToTicket }) => {
  const [comment, setComment] = useState('');
  const [closed, setClosed] = useState(false);

  return (
    <div className='commentOnTicket'>
      <div className='tic_header textleft font14 bold'>Leave a Response</div>
      <div className='tic_body'>
        <form
          className='commentForm'
          onSubmit={e => {
            e.preventDefault();
            addCommentToTicket(ticketID, { comment, closed });
            setComment('');
          }}
        >
          <textarea
            name='comment'
            value={comment}
            placeholder='Enter Response'
            required
            onChange={e => setComment(e.target.value)}
          ></textarea>
          <br />
          <div style={{ marginBottom: '20px' }}>
            <input
              name='closed'
              type='checkbox'
              value='1'
              onClick={e => setClosed(e.target.checked)}
            />{' '}
            Close this ticket, with this answer
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
};

CommentItemForm.propTypes = {
  addCommentToTicket: PropTypes.func.isRequired
};

export default connect(null, { addCommentToTicket })(CommentItemForm);
