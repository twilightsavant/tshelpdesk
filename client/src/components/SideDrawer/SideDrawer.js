import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import logo from './logo.png';
import './SideDrawer.css';
import SideDrawerLinks from './SideDrawer_Links';

//get actions
import { closeNavBar } from '../../actions/navbar';

const SideDrawer = ({ closeNavBar, navbar }) => {
  let drawerClasses = 'side-drawer';
  if (navbar.display) {
    drawerClasses = 'side-drawer open';
  }

  return (
    <nav className={drawerClasses}>
      <Link to='/' onClick={e => closeNavBar()}>
        <img src={logo} id='sideDrawer_logo' alt='Twilight Savant Logo' />
      </Link>
      <SideDrawerLinks />
    </nav>
  );
};

SideDrawer.propTypes = {
  closeNavBar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  navbar: state.navbar
});

export default connect(mapStateToProps, { closeNavBar })(SideDrawer);
