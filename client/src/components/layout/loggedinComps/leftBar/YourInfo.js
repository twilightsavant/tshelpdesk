import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../Spinner';
import { loadProfile, saveYourInfo } from '../../../../actions/auth';
import { setAlert } from '../../../../actions/alert';

import './leftBar.css';

const YourInfo = ({
  auth: { user, loading },
  loadProfile,
  setAlert,
  saveYourInfo
}) => {
  const [showEditState, setShowEditState] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    position: '',
    cellphone: ''
  });

  const { name, email } = formData;

  useEffect(() => {
    //loadProfile();
    setFormData({
      name: loading || !user.name ? '' : user.name,
      email: loading || !user.email ? '' : user.email,
      department: loading || !user.department ? '' : user.department,
      position: loading || !user.position ? '' : user.position,
      cellphone: loading || !user.cellphone ? '' : user.cellphone
    });
  }, [loading, user]);

  const saveUserInfo = () => {
    console.log('should have saved');
    if (name.length === 0) {
      setAlert('Please enter your name', 'danger');
    } else if (email.length === 0) {
      setAlert('Please enter your email/login', 'danger');
    } else {
      saveYourInfo(formData);
      //loadProfile();
      setShowEditState(false);
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showUI = () => {
    if (showEditState) {
      const { name, email, department, position, cellphone } = formData;
      return (
        <Fragment>
          <ul>
            <li>
              <div className='editYourInfo_inputDesc bold'>Your Name:</div>
              <input
                type='text'
                name='name'
                value={name}
                placeholder='Enter Your Name'
                onChange={e => onChange(e)}
                className='editYourInfo_input'
              />
            </li>
            <li>
              <div className='editYourInfo_inputDesc bold'>
                Your Email/Login:
              </div>
              <input
                type='text'
                name='email'
                value={email}
                placeholder='Enter Your Email'
                onChange={e => onChange(e)}
                className='editYourInfo_input'
              />
            </li>
            <li>
              <div className='editYourInfo_inputDesc bold'>
                Your Department:
              </div>
              <input
                type='text'
                name='department'
                value={department}
                placeholder='Enter Department'
                onChange={e => onChange(e)}
                className='editYourInfo_input'
              />
            </li>
            <li>
              <div className='editYourInfo_inputDesc bold'>Your Position:</div>
              <input
                type='text'
                name='position'
                value={position}
                placeholder='Enter Your Position'
                onChange={e => onChange(e)}
                className='editYourInfo_input'
              />
            </li>
            <li>
              <div className='editYourInfo_inputDesc bold'>
                Your Phone Number:
              </div>
              <input
                type='text'
                name='cellphone'
                value={cellphone}
                placeholder='Enter Your Number'
                onChange={e => onChange(e)}
                className='editYourInfo_input'
              />
            </li>
          </ul>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ul>
          <li className='bold'>{user.name}</li>
          <li>{user.email}</li>
          <li>
            {user.department ? user.department : <i>No Department Listed</i>}
          </li>
          <li>{user.position ? user.position : <i>No Position Listed</i>}</li>
          {user.cellphone ? <li>Phone: {user.cellphone}</li> : ''}
        </ul>
      </Fragment>
    );
  };

  const showButton = () => {
    if (showEditState) {
      return (
        <div className='btn save' onClick={e => saveUserInfo()}>
          <i className='far fa-save'></i> Save Info
        </div>
      );
    }

    return (
      <div className='btn edit' onClick={e => setShowEditState(true)}>
        <i className='fas fa-wrench'></i> Update
      </div>
    );
  };

  return (
    <div className='outer_box_rad leftBar_YourInfo'>
      <div className='titleDiv'>
        <i className='far fa-user'></i> Your Info
      </div>
      <div className='contDiv'>
        {loading ? <Spinner /> : showUI(showEditState)}
      </div>
      {!loading && showButton()}
    </div>
  );
};

YourInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, {
  loadProfile,
  setAlert,
  saveYourInfo
})(YourInfo);
