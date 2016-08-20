import React, { Component, PropTypes } from 'react';
import FarmPlanner from './FarmPlanner.jsx';
import FarmList from './FarmList.jsx';
import InvestorPlan from './InvestorPlan.jsx';
import Login from './Login.jsx';
import NavBar from './NavBar.jsx';
import JumboTron from './JumboTron.jsx';
import Features from './Features.jsx';

export default class App extends Component {

  render() {
    return (
        <div>
        <NavBar />
        <JumboTron />
        <Features />
        <FarmPlanner/>
        <FarmList />
        <InvestorPlan />
        <Login />
      </div>
    );
  }
}
