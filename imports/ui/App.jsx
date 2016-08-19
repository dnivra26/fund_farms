import React, { Component, PropTypes } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import FarmPlanner from './FarmPlanner.jsx';
import FarmList from './FarmList.jsx';
import InvestorPlan from './InvestorPlan.jsx';


export default class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <FarmPlanner/>
        <FarmList />
        <InvestorPlan />

        <AccountsUIWrapper />
      </div>
    );
  }
}
