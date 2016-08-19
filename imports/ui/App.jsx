import React, { Component, PropTypes } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import FarmPlanner from './FarmPlanner.jsx'


export default class App extends Component {

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>
        </header>
        <FarmPlanner/>

        <AccountsUIWrapper />
      </div>
    );
  }
}
