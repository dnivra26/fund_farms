import React, { Component, PropTypes } from 'react';
import { Investments } from '../api/Investments.js';
import { createContainer } from 'meteor/react-meteor-data';
import { Plans } from '../api/plans.js';
import { HTTP } from 'meteor/http'
import _ from 'lodash';

class InvestorPlan extends Component {

  constructor() {
    super();
    this.state = {
      amount: 0
    };
  }

  handleInvest() {
    const plan = _.find(this.props.plans, { crop: this.props.params.cropId });
    Investments.insert({
      amount: this.state.amount,
      planId: plan._id,
      userId: this.props.params.userId,
      createdAt: new Date()
    });
    HTTP.call("POST", "http://localhost:8080/payments/"+ this.props.params.userId +"/create",
      {params: {amount: this.state.amount, purpose: "Farming Chennai"}}, function(error, result){
          if(!error) {
            urlToRoute = JSON.parse(result.content).payment_request.longurl
            window.location.assign(urlToRoute);
          }
      });
  }


  handleChange(value) {
    this.setState({
      amount: value
    })
  }

  render() {
    const plan = _.find(this.props.plans, { crop: this.props.params.cropId });
    const investments = Investments.find({}).fetch();
    const planInvestMentAmount = _.chain(investments)
      .filter((investment) => investment.planId === plan._id )
      .sumBy((investment) => investment.amount)
      .value();
    return (
      <div>
        <div>
          <div>CROP {plan.crop}</div>
          <div>TOTAL AMOUNT: {plan.amount}</div>
          <div>AMOUNT INVESTED: {planInvestMentAmount}</div>
          <div>AMOUNT REMAINING: {plan.amount - planInvestMentAmount}</div>
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
  params: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired
};

export default createContainer(() => {
  console.log('hi',Plans.find({}).fetch());
  return {
    plans: Plans.find({}).fetch(),
  };
}, InvestorPlan);
