import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Spinner from '../../Spinner';
import { loadProfile } from '../../../../actions/profile';

import './leftBar.css';

const YourInfo = ({ auth: { user, loading }, loadProfile }) => {
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  //console.log(loading);

  return (
    <div className='outer_box_rad leftBar_YourInfo'>
      <div className='titleDiv'>
        <i className='far fa-user'></i> Your Info
      </div>
      <div className='contDiv'>
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            <li className='bold'>{user.name}</li>
            <li>{user.email}</li>
            <li>
              {user.department ? user.department : <i>No Department Listed</i>}
            </li>
            <li>{user.position ? user.position : <i>No Position Listed</i>}</li>
            {user.cellphone ? <li>user.cellphone</li> : ''}
          </ul>
        )}
      </div>
      <div className='btn'>
        <i className='fas fa-wrench'></i> Update
      </div>
    </div>
  );
};

YourInfo.propTypes = {
  auth: PropTypes.object.isRequired,
  loadProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { loadProfile })(YourInfo);
