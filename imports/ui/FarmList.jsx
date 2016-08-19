import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';

export default class FarmList extends Component {
  renderPlans() {
    return this.props.plans.map((plan) => (
      <li key={plan._id}>{plan.crop}</li>
    ));
  }
  render() {
    return (
      <ul>
        {this.renderPlans()}
      </ul>
    )
  }
}

FarmList.propTypes = {
  plans: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    plans: Plans.find({}).fetch(),
  };
}, FarmList);