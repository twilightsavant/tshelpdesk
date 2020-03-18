import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* Import CSS */
import './Backdrop.css';

//get actions
import { closeNavBar } from '../../actions/navbar';

const Backdrop = ({ closeNavBar }) => (
  <div className='backdrop' onClick={e => closeNavBar()} />
);

Backdrop.propTypes = {
  closeNavBar: PropTypes.func.isRequired
};

export default connect(null, { closeNavBar })(Backdrop);
