import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';
import { Accounts } from '../api/accounts.js';
import _ from 'lodash';

class FarmList extends Component {
  onClick(crop){
    this.context.router.push(`/user/${this.props.params.userId}/crops/${crop}/investorPlan`);
  }
  renderPlans(plans) {
    return plans.map((plan) => (
      <li onClick={() => this.onClick(plan.crop)} key={plan._id}>{plan.crop}</li>
    ));
  }
  render(){
    return (
      <div>
        <div>{_.find(this.props.accounts, (account) => account._id === this.props.params.userId).balance}</div>
        <ul>
          {this.renderPlans(_.filter(this.props.plans, (plan) => plan.status !== 'CLOSED'))}
        </ul>
      </div>
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
        accounts: Accounts.find({}).fetch()
  };
}, FarmList);