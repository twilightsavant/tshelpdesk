import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Footer.css';

import footerlogo from './footerlogo.png';

const Footer = ({ auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>HOME</li>
      <li>VIEW TICKETS</li>
      <li>LOGOUT </li>
      <li>CONTACT US</li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>HOME</li>
      <li>LOGIN</li>
      <li>REGISTER</li>
      <li>CONTACT US</li>
    </ul>
  );

  return (
    <footer>
      <div className='centerContainer'>
        <div className='contentLeft'>
          <img src={footerlogo} alt='Footer Help Desk' />
          <div className='footerNav'>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
            @ 2020 All rights reserved
            <br />
            Built by Twilight Savant
          </div>
        </div>
        <div className='contentRight'>
          <h2>HELP DESK</h2>
          <h3>IS FOR DEMO PURPOSES ONLY</h3>
          BUILT ON THE MERN STACK
          <br />
          AS A CODING SHOWCASE
          <br />
          BY TWILIGHTSAVANT.COM
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Footer);
