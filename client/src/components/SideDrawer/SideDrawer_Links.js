import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { closeNavBar } from '../../actions/navbar';

const SideDrawer_Links = ({
  auth: { isAuthenticated, loading },
  logout,
  closeNavBar
}) => {
  const authLinks = (
    <div className='l_links'>
      <ul>
        <li>
          <Link to='/' className='color_main' onClick={e => closeNavBar()}>
            HOME
          </Link>
        </li>
        <li>
          <Link
            to='/newticket'
            className='color_main'
            onClick={e => closeNavBar()}
          >
            NEW TICKET
          </Link>
        </li>
        <li>
          <Link
            to='/viewtickets'
            className='color_main'
            onClick={e => closeNavBar()}
          >
            VIEW TICKETS
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
    <ul>
      <li>
        <Link to='/' onClick={e => closeNavBar()}>
          HOME
        </Link>
      </li>
      <li>
        <Link to='/login' onClick={e => closeNavBar()}>
          LOGIN
        </Link>
      </li>
      <li>
        <Link to='/register' onClick={e => closeNavBar()}>
          REGISTER
        </Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};

SideDrawer_Links.propTypes = {
  closeNavBar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout, closeNavBar })(
  SideDrawer_Links
);
