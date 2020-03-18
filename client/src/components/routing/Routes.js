import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';
import Login from '../layout/login/Login';
import Register from '../layout/register/Register';
import ViewTickets from '../layout/loggedinComps/viewTickets/ViewTickets';
import ViewTicket from '../layout/loggedinComps/viewTicket/ViewTicket';
import SaveTicket from '../layout/loggedinComps/saveTicket/SaveTicket';
import NewTicket from '../layout/loggedinComps/newTicket/NewTicket';

const Routes = props => {
  return (
    <Fragment>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/viewtickets' component={ViewTickets} />
        <PrivateRoute path='/viewticket/:id' component={ViewTicket} />
        <PrivateRoute path='/newticket' component={NewTicket} />
        <PrivateRoute path='/editticket/:id' component={SaveTicket} />
      </Switch>
    </Fragment>
  );
};

export default Routes;
