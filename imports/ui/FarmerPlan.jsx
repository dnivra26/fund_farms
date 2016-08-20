import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';
import { Investments } from '../api/Investments';
import { Accounts } from '../api/accounts';
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

    const investments = Investments.find({}).fetch();
    _.each(investments, (investment) => {

    });
    _.chain(investments)
      .filter((investment) => {
        return investment.planId === plan._id;
      })
      .each((investment) => {
          Accounts.update({
            _id: investment.userId
          },
          {
            $set: {
              balance: this.state.amount * investment.amount / plan.amount,
            }
          }
        );
      })
      .value();
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
        <header>Farmer Plan</header>
        <div className="farmer-plan-container plan-container">
          <div>
              <label>Crop: {plan.crop}</label><br />
              <label>Total Amount: {plan.amount}</label>
          </div>
          <br />
          <section>
            <label>CLOSE PLAN:</label><br/>
            <div className="line-item">
              <label>Amount: </label>
              <input type="text" value={this.state.amount} onChange={(event) => this.handleChange(event.target.value)} /><br />
            </div>
            <div className="center-wrapper">
              <button className="center" onClick={() => this.handleClose()}>Close</button>
            </div>
          </section>
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
