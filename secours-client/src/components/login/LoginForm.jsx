import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';


function validateInput(data)  {
  let errors = {};
  if (Validator.isEmpty(data.identifier)) {
    errors.identifier = 'This field is required';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleSubmit(e){
  e.preventDefault();

  if (this.isValid()) {
   this.setState({ errors: {}, isLoading: true });
   this.props.login(this.state).then(
    (res) => this.context.router.history.push('/'),
    (err) => this.setState({ errors: err.response.data.errors, isLoading: false })
   );
  }
 }﻿

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { identifier, password, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>

        { errors.form ? <div className="alert alert-danger">{errors.form}</div> : '' }

        <TextFieldGroup
          field="identifier"
          label="Username / Email"
          onChange={this.handleChange}
          name="identifier"
          value={identifier}
          error={errors.identifier}
          />

        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          name="password"
          error={errors.password}
          onChange={this.handleChange}
          type="password"
          />

        <button className="btn btn-primary btn-lg">Login</button>
      </form>
    )
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { login })(LoginForm);
