import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';

class FarmList extends Component {
  onClick(crop){
    this.context.router.push(`/user/${this.props.params.userId}/crops/${crop}/investorPlan`);
  }
  renderPlans() {
    return this.props.plans.map((plan) => (
      <li onClick={() => this.onClick(plan.crop)} key={plan._id}>{plan.crop}</li>
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
  params: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired
};

FarmList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  return {
    plans: Plans.find({}).fetch(),
  };
}, FarmList);