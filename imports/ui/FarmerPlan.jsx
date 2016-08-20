import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';
import _ from 'lodash';

class FarmerPlan extends Component {

  constructor() {
    super();
    this.state = {
      amount: 0
    };
  }

  handleClose() {
    const plan = _.find(this.props.plans, { crop: this.props.params.cropId });
    Plans.update(
      {
        _id: plan._id
      },
      {
        $set: {
          finalAmount: this.state.amount,
          status: 'CLOSED'
        }
      }
    );
  }

  handleChange(value) {
    this.setState({
      amount: value
    })
  }

  render() {
    const plan = _.find(this.props.plans, { crop: this.props.params.cropId });
    return (
      <div>
        <div>
          <div>CROP {plan.crop}</div>
          <div>TOTAL AMOUNT: {plan.amount}</div>
        </div>
        <div>CLOSE PLAN</div>
        <div>
          Amount <input type="text" value={this.state.amount} onChange={(event) => this.handleChange(event.target.value)} />
          <button label="Close" onClick={() => this.handleClose()} />
        </div>
      </div>
    )
  }
}

FarmerPlan.propTypes = {
  params: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired
};

export default createContainer(() => {
  return {
    plans: Plans.find({}).fetch(),
  };
}, FarmerPlan);
