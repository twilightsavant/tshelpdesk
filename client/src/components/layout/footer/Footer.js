import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../../actions/auth';
import './Footer.css';

import footerlogo from './footerlogo.png';

const Footer = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/'>HOME</Link>
      </li>
      <li>
        <Link to='/newticket'>NEW TICKET</Link>
      </li>
      <li>
        <Link to='/viewtickets'>VIEW TICKETS</Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          LOGOUT
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/'>HOME</Link>
      </li>
      <li>
        <Link to='/login'>LOGIN</Link>
      </li>
      <li>
        <Link to='/register'>REGISTER</Link>
      </li>
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
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Footer);
