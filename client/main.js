import React from "react";
import {Meteor} from "meteor/meteor";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import FarmPlanner from "../imports/ui/FarmPlanner.jsx";
import FarmList from "../imports/ui/FarmList.jsx";
import InvestorPlan from "../imports/ui/InvestorPlan.jsx";
import FarmerFarmList from "../imports/ui/FarmerFarmList.jsx";
import FarmerPlan from "../imports/ui/FarmerPlan.jsx";
import Login from "../imports/ui/Login.jsx";

Meteor.startup(() => {
  render(
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/user/:userId/farmList" component={FarmList}/>
      <Route path="/user/:userId/crops/:cropId/investorPlan" component={InvestorPlan}/>
      <Route path="/user/:userId/farmerFarmList" component={FarmerFarmList}/>
      <Route path="/user/:userId/crops/:cropId/farmerPlan" component={FarmerPlan}/>
      <Route path="/user/:userId/farmPlanner" component={FarmPlanner}/>
    </Router>, document.getElementById('render-target'));
});