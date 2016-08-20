import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import App from '../imports/ui/App.jsx';
import FarmPlanner from '../imports/ui/FarmPlanner.jsx';
import FarmList from '../imports/ui/FarmList.jsx';
import InvestorPlan from '../imports/ui/InvestorPlan.jsx';
import Login from '../imports/ui/Login.jsx';


Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/user/:userId/farmList" component={FarmList}/>
      <Route path="/user/:userId/investorPlan" component={InvestorPlan}/>
      <Route path="/user/:userId/farmPlanner" component={FarmPlanner}/>
    </Router>, document.getElementById('render-target'));
});