import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../../actions/auth';

import './Login.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Redirect to='/viewtickets' />;
  }

  return (
    <div className='loginPage'>
      <div className='centerContainer delayFadeIn'>
        <div className='login_box'>
          <div className='titleDiv'>
            <span className='color_blue font24 bold'>Login</span>This page is
            restricted
          </div>
          <form className='form' onSubmit={e => onSubmit(e)}>
            <div className='emailDiv'>
              Email Address
              <br />
              <input
                type='email'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='passwordDiv'>
              Password
              <br />
              <input
                type='password'
                name='password'
                minLength='6'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='actionBtns'>
              <input type='submit' id='loginButton' value='Login' />
            </div>
          </form>
          <div className='getStarted'>
            Don't Have an Account?
            <br />
            <Link to='/register'>
              <button className='getStartedBtn'>Get Started</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
