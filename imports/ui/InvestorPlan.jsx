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
    HTTP.call("POST", "http://128.199.169.123/payments/"+ this.props.params.userId +"/create",
      {params: {amount: this.state.amount, purpose: "Farming Chennai"}}, function(error, result){
          if(!error) {
            urlToRoute = JSON.parse(result.content).payment_request.longurl
            window.location.assign(urlToRoute);
          }
      });
    //twilio call
    HTTP.call("POST", "http://128.199.169.123/notify_farmer", {params: {to_number: '+917358016864'}}, () => {});
    HTTP.call("POST", "http://128.199.169.123/sms", {params: {from: '+15123944867', to: '+917358016864', message: `An amount of ${this.state.amount} got credited for ${plan.crop}`}}, () => {});
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
        <header>Investor Plan</header>
        <div className="investor-plan-container plan-container">
          <label>CROP {plan.crop}</label><br />
          <label>TOTAL AMOUNT: {plan.amount}</label><br />
          <label>AMOUNT INVESTED: {planInvestMentAmount}</label><br />
          <label>AMOUNT REMAINING: {plan.amount - planInvestMentAmount}</label><br />
          <label>Percentage complete: {planInvestMentAmount*100/plan.amount} %</label><br />
          <label>No of Backers: {_.filter(investments, (investment) => investment.planId === plan._id).length}</label><br />
          <label>Amount: </label> <input type="text" value={this.state.amount} onChange={(event) => this.handleChange(event.target.value)} />
          <button label="Invest" onClick={() => this.handleInvest()}>Invest</button>
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
