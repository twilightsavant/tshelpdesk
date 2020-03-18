import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';

import './Register.css';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      console.log(formData);
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='registerPage'>
      <div className='centerContainer delayFadeIn'>
        <div className='register_box'>
          <div className='titleDiv'>
            <span className='color_blue font24 bold'>Register</span>Enter Your
            Information Below
          </div>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='formDiv'>
              Your Name
              <br />
              <input
                type='text'
                name='name'
                value={name}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='formDiv'>
              Email Address
              <br />
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='formDiv'>
              Password
              <br />
              <input
                type='password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='formDiv'>
              Confirm Password
              <br />
              <input
                type='password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='actionBtns'>
              <input type='submit' id='registerButton' value='Register' />
            </div>
          </form>
          <div className='getStarted'>
            Already Have an Account?
            <br />
            <Link to='/login'>
              <button className='getStartedBtn'>Login to Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
