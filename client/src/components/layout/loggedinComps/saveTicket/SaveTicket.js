import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'; //History variable comes from here

import Spinner from '../../Spinner';
import { setAlert } from '../../../../actions/alert';
import { saveTicket, viewTicketGet } from '../../../../actions/tickets';

import './../loggedIn.css';
import './SaveTicket.css';

const SaveTicket = ({
  auth,
  tickets: { loading, viewTicket },
  saveTicket,
  setAlert,
  viewTicketGet,
  match,
  history
}) => {
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    priority: 1,
    topic: ''
  });

  const { subject, message, priority, topic } = formData;

  useEffect(() => {
    viewTicketGet(match.params.id);
    setFormData({
      subject: loading || !viewTicket.subject ? '' : viewTicket.subject,
      message: loading || !viewTicket.message ? '' : viewTicket.message,
      topic: loading || !viewTicket.topic ? '' : viewTicket.topic,
      priority: loading || !viewTicket.priority ? '' : viewTicket.priority
    });
  }, [loading, viewTicketGet, match.params.id]);

  //Security Check & Compliance check for editing of a ticket
  if (!loading) {
    if (auth.user._id !== viewTicket.user) {
      return <Redirect to='/viewTickets' />;
    }

    //compliance check, no editing if there are comments
    if (viewTicket.comments && viewTicket.comments.length > 0) {
      return <Redirect to='/viewTickets' />;
    }
  }

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    //Form Validate
    if (subject.length === 0) {
      setAlert('Please enter a subject for your ticket', 'danger');
    } else if (message.length === 0) {
      setAlert('Please enter a message for your ticket', 'danger');
    } else if (topic.length === 0) {
      setAlert('Please select a topic for your ticket', 'danger');
    } else {
      let formData = {
        subject,
        message,
        priority,
        topic
      };
      saveTicket(match.params.id, formData, history);
    }
  };

  return (
    <form name='saveTicket'>
      <div className='loggedInComps saveTicketScreen'>
        <div className='centerContainer'>
          <div className='leftBar'>
            <div className='outer_box_rad leftBar_saveTicket'>
              <div className='titleDiv'>
                <i className='far fa-user'></i> Edit Ticket Options
              </div>
              <div className='contDiv'>
                {loading ? (
                  <Spinner />
                ) : (
                  <ul>
                    <li className='bold'>
                      <div className='inputDesc'>Ticket Topic:</div>
                      <select
                        name='topic'
                        value={topic}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Select Topic</option>
                        <option value='Desktop'>Desktop</option>
                        <option value='Website'>Website</option>
                        <option value='Mobile Device'>Mobile Device</option>
                        <option value='Email'>Email</option>
                        <option value='Help Desk'>Help Desk</option>
                      </select>
                    </li>
                    <li className='bold'>
                      <div className='inputDesc'>Ticket Priority:</div>
                      <select
                        name='priority'
                        value={priority}
                        onChange={e => onChange(e)}
                      >
                        <option value='0'>Low Priority</option>
                        <option value='1'>Medium Priority</option>
                        <option value='2'>High Priority</option>
                      </select>
                    </li>
                  </ul>
                )}
              </div>

              <div className='btn save' onClick={e => onSubmit(e)}>
                <i className='far fa-save'></i> Save Ticket
              </div>
            </div>
          </div>
          <div className='rightBar'>
            {loading ? (
              <div className='justifyCenter'>
                <Spinner />
              </div>
            ) : (
              <Fragment>
                <div className='titleDiv'>
                  <span className='color_blue font24 bold'>
                    Edit Help Ticket
                  </span>
                </div>
                <div>
                  <div className='inputDesc'>Ticket Subject</div>{' '}
                  <input
                    type='text'
                    name='subject'
                    value={subject}
                    onChange={e => onChange(e)}
                  />
                  <br />
                  <div className='inputDesc inputSpacer'>Ticket Message</div>
                  <textarea
                    name='message'
                    value={message}
                    placeholder='Your Message Here'
                    onChange={e => onChange(e)}
                  />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

SaveTicket.propTypes = {
  auth: PropTypes.object.isRequired,
  tickets: PropTypes.object.isRequired,
  saveTicket: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  tickets: state.tickets
});

export default connect(mapStateToProps, {
  saveTicket,
  setAlert,
  viewTicketGet
})(withRouter(SaveTicket));
