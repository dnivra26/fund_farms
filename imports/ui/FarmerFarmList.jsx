import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';
import _ from 'lodash';

class FarmerFarmList extends Component {
  onClick(crop){
    this.context.router.push(`/user/${this.props.params.userId}/crops/${crop}/farmerPlan`);
  }
  onNewPlan(){
    this.context.router.push(`/user/${this.props.params.userId}/farmPlanner`);
  }
  renderPlans(plans) {
    return plans.map((plan) => (
      <li className="plan" onClick={() => this.onClick(plan.crop)} key={plan._id}>{plan.crop}</li>
    ));
  }
  render() {
    return (
      <div>
        <header>MY PLANS</header>
        <ul>
          {this.renderPlans(_.filter(this.props.plans, (plan) =>
          plan.userId === this.props.params.userId && plan.status !== 'CLOSED'
          ))}
        </ul>
        <button onClick={()=>this.onNewPlan()}>Create new plan</button>
      </div>
    )
  }
}

FarmerFarmList.propTypes = {
  params: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired
};

FarmerFarmList.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default createContainer(() => {
  return {
    plans: Plans.find({}).fetch(),
  };
}, FarmerFarmList);