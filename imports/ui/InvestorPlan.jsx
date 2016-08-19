import React, { Component, PropTypes } from 'react';
import { Investments } from '../api/Investments.js';

export default class InvestorPlan extends Component {

  constructor() {
    super();
    this.state = {
      amount: 0
    };
  }

  handleInvest() {
    Investments.insert({
      amount: this.state.amount,
      planId: this.props.plan._id,
      createdAt: new Date()
    })
  }

  handleChange(value) {
    this.setState({
      amount: value
    })
  }

  render() {
    return (
      <div>
        <div>
          {this.props.plan.crop}
          {this.props.plan.amount}
        </div>
        <div>
          Amount <input type="text" value={this.state.amount} onChange={(event) => this.handleChange(event.target.value)} />
          <button label="Invest" onClick={() => this.handleInvest()} />
        </div>
      </div>
    )
  }
}

InvestorPlan.propTypes = {
  plan: PropTypes.object
};

InvestorPlan.defaultProps = {
  plan: {
    _id : "NGhfEH9adutvsp7ZF",
    crop : "wheat",
    amount : 9090
  }
};