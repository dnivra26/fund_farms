import React, { Component, PropTypes } from 'react';
import { Plans } from '../api/plans';

export default class FarmPlanner extends Component {
  constructor() {
    super();
    this.state = {
      crop: '',
      amount: 0
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
          <button name="Create" onClick={() => this.createPlan()}/>
        </div>
      </div>
    );
  }
}
