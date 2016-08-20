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
      role: 'farmer',
      phone: ''
    }
  }

  createUser() {
    Accounts.insert({
      name: this.state.name,
      password: this.state.password,
      role: this.state.role,
      balance: 0,
      phone: this.state.phone,
      createdAt: new Date()
    });
    this.signInUser();
  }

    signInUser() {
        const users = Accounts.find({
            name: this.state.name,
            password: this.state.password
        }).fetch();
        this.goToHomePage(users)
    }

   goToHomePage(user) {
        if (user.length === 1) {
            if (user[0].role === 'farmer') {
                this.context.router.push(`/user/${user[0]._id}/farmerFarmList`);
            } else {
                this.context.router.push(`/user/${user[0]._id}/farmList`);
            }
        }
    };

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
      <div className="login-container">
        <div className="nameBox-container">
          <label>Name: </label>
          <input className="nameBox" value={this.state.name}
                 onChange={(event) => this.handleChange('name', event.target.value)}/>
        </div>
        <div className="phoneBox-container">
          <label>Ph. Number: </label>
          <input className="phoneBox" value={this.state.phone}
                 onChange={(event) => this.handleChange('phone', event.target.value)}/>
        </div>
        <div className="passwordBox-container">
          <label>Password: </label>
          <input className="passwordBox" value={this.state.password} type="password"
                 onChange={(event) => this.handleChange('password', event.target.value)}/>
        </div>
        <div className="roleBox-container">
          <label>Role:</label>
          <Select
            className="roleBox"
            value={this.state.role}
            options={options}
            onChange={(value) => this.logChange(value)}
          />
        </div>
        <div className="buttons-container">
          <button className="btn btn-md btn-default" label="sign in" onClick={() => this.signInUser()} >Sign In</button>
          <button className="btn btn-md btn-default" label="sign up" onClick={() => this.createUser()} >Sign Up</button>
        </div>
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object.isRequired,
};
