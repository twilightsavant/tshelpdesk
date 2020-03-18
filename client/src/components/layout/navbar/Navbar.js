import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import layout stuff
import './Navbar.css';
import NavBarLinks from './NavBar_Links';
import nav_logo from './nav_logo.png';
import NavDrawerBtn from '../navDrawerBtn/NavDrawerBtn';

//get actions
import { openNavBar } from '../../../actions/navbar';

const Navbar = ({ openNavBar }) => {
  return (
    <div className='headerPlaceHolder'>
      <header>
        <div className='centerContainer color_main font14'>
          <div className='navBar'>
            <div className='logo'>
              <img src={nav_logo} alt='Help Desk' />
            </div>
            <div className='drawerNav'>
              <NavDrawerBtn click={e => openNavBar()} />
            </div>
            <NavBarLinks />
          </div>
        </div>
      </header>
    </div>
  );
};

Navbar.propTypes = {
  openNavBar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  navbar: state.navbar
});

export default connect(mapStateToProps, { openNavBar })(Navbar);
