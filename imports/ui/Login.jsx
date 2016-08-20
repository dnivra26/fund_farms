import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import '../../node_modules/react-select/dist/react-select.css';
import { Accounts } from '../api/accounts.js';

const options = [
  { value: 'farmer', label: 'Farmer' },
  { value: 'investor', label: 'Investor' }
];

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      name: '',
      password: '',
      role: 'farmer'
    }
  }

  createUser() {
    Accounts.insert({
      name: this.state.name,
      password: this.state.password,
      role: this.state.role,
      balance: 0,
      createdAt: new Date()
    })
  }

  signInUser() {
    const user = Accounts.find({
      name: this.state.name,
      password: this.state.password
    }).fetch();
    if ( user.length === 1 ) {
      if ( user[0].role.value === 'farmer') {
        this.context.router.push(`/user/${user[0]._id}/farmPlanner`);
      } else {
        this.context.router.push(`/user/${user[0]._id}/farmList`);
      }
    }
  }

  logChange(val) {
    this.setState({
      role: val
    });
  }

  handleChange(component, value) {
    this.setState({
      [component]: value
    });
  }

  render() {
    return (
      <div>
        <div>
          Name
          <input value={this.state.name}
                 onChange={(event) => this.handleChange('name', event.target.value)}/>
        </div>
        <div>
          Password
          <input value={this.state.password}
                 onChange={(event) => this.handleChange('password', event.target.value)}/>
        </div>
        <div>
          Role
          <Select
            value={this.state.role}
            options={options}
            onChange={(value) => this.logChange(value)}
          />
        </div>
        <button className="btn btn-md btn-default" label="sign in" onClick={() => this.signInUser()} >Sign In</button>
        <button className="btn btn-md btn-default" label="sign up" onClick={() => this.createUser()} >Sign Up</button>

      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
