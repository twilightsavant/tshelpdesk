import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../../actions/auth';

const NavBar_Links = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className='l_links'>
      <ul>
        <li>
          <Link to='/' className='color_main'>
            HOME
          </Link>
        </li>
        <li>
          <Link to='/newticket' className='color_main'>
            NEW TICKET
          </Link>
        </li>
        <li>
          <Link to='/viewtickets' className='color_main'>
            VIEW TICKETS
          </Link>
        </li>
        <li>
          <Link to='/settings' className='color_main'>
            SETTINGS
          </Link>
        </li>
        <li>
          <Link to='/contact' className='color_main'>
            CONTACT
          </Link>
        </li>
        <li>
          <a href='#!' onClick={logout}>
            LOGOUT
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <div className='l_links'>
      <ul>
        <li>
          <Link to='/' className='color_main'>
            HOME
          </Link>
        </li>
        <li>
          <Link to='/login' className='color_main'>
            LOGIN
          </Link>
        </li>
        <li>
          <Link to='/register' className='color_main'>
            REGISTER
          </Link>
        </li>
        <li>
          <Link to='/contact' className='color_main'>
            CONTACT
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

NavBar_Links.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar_Links);
