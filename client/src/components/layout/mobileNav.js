import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SideDrawer from '../SideDrawer/SideDrawer';
import ScrollToTop from '../utils/ScrollToTop';
import NavBar from './navbar/Navbar';
import Backdrop from '../Backdrop/Backdrop';

//get actions
import { openNavBar } from '../../actions/navbar';

const mobileNav = ({ openNavBar, navbar }) => {
  let backdrop = '';
  backdrop = <Backdrop />;

  return (
    <Fragment>
      <SideDrawer />
      {navbar.display && backdrop}
      <ScrollToTop />
      <NavBar />
    </Fragment>
  );
};

mobileNav.propTypes = {
  openNavBar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  navbar: state.navbar
});

export default connect(mapStateToProps, { openNavBar })(mobileNav);
