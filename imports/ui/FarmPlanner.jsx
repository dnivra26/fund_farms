import React, { Component, PropTypes } from 'react';
import { Plans } from '../api/plans';

export default class FarmPlanner extends Component {
  constructor() {
    super();
    this.state = {
      crop: '',
      amount: 0,
      months: 0,
      location: ''
    };
  }
  handleChange(component, value) {
    this.setState(
      {
        [component]: value
      }
    )
  }
  createPlan() {
    Plans.insert({
      crop: this.state.crop,
      amount: this.state.amount,
      userId: this.props.params.userId,
      months: this.state.months,
      location: this.state.location,
      createdAt: new Date()
    });
      this.context.router.push(`/user/${this.props.params.userId}/farmerFarmList`);
  }
  render() {
    return (
      <div>
        <header>New Plan</header>
        <div className="farmer-edit-plan-container plan-container">
          <div className="line-item">
            <label>Crop</label>
            <input type="text" value={this.state.crop} onChange={(event) => this.handleChange('crop', event.target.value)} />
          </div>
          <div className="line-item">
            <label>Amount</label>
            <input type="text" value={this.state.amount} onChange={(event) => this.handleChange('amount', event.target.value)} />
          </div>
          <div className="line-item">
            <label>Number of months</label>
            <input type="text" value={this.state.months} onChange={(event) => this.handleChange('months', event.target.value)} />
          </div>
          <div className="line-item">
            <label>Location</label>
            <input type="text" value={this.state.location} onChange={(event) => this.handleChange('location', event.target.value)} />
          </div>
          <div className="line-item">
            <button onClick={() => this.createPlan()}>Create</button>
          </div>
        </div>
      </div>
    );
  }
}

FarmPlanner.propTypes = {
  params: PropTypes.object.isRequired
};


FarmPlanner.contextTypes = {
  router: React.PropTypes.object.isRequired
};

