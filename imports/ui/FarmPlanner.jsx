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
    })
  }
  render() {
    return (
      <div>
        <div>
          Crop
          <input type="text" value={this.state.crop} onChange={(event) => this.handleChange('crop', event.target.value)} />
        </div>
        <div>
          Amount
          <input type="text" value={this.state.amount} onChange={(event) => this.handleChange('amount', event.target.value)} />
        </div>
        <div>
          Number of months
          <input type="text" value={this.state.months} onChange={(event) => this.handleChange('months', event.target.value)} />
        </div>
        <div>
          Location
          <input type="text" value={this.state.location} onChange={(event) => this.handleChange('location', event.target.value)} />
        </div>
        <div>
          <button name="Create" onClick={() => this.createPlan()}/>
        </div>
      </div>
    );
  }
}

FarmPlanner.propTypes = {
  params: PropTypes.object.isRequired,
};
