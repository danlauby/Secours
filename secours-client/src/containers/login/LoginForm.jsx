import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { login } from '../../actions/authActions';
import { addFlashMessage } from '../../actions/flashMessages';


class LoginForm extends Component {

  loginSubmit = (values) => {
    this.props.flashMessages.splice(-1,1);
    this.props.login(values).then(
      () => {
        if (this.props.auth.isAuthenticated) {
        this.props.addFlashMessage({
          type: 'success',
          text: `Welcome Back ${values.identifier}!`
        });
        this.props.history.push('/');
      }
    }
    );
  }

  renderInput = ({ input, meta, label, type }) =>
  <div>
    <Label>{label}</Label>
    <Input type={type} {...input} valid={meta.error && meta.touched ? false : null }/>
    <FormFeedback >
      {meta.error && meta.touched ? <span>{meta.error}</span> : ''}
    </FormFeedback>
  </div>

  render() {
    const { handleSubmit } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.loginSubmit.bind(this))}>
        <h1>Login</h1>
        <FormGroup>
          <Field name="identifier" type="text" label="Username / Email" component={this.renderInput} />
        </FormGroup>
        <FormGroup>
          <Field name="password" type="password" label="Password" component={this.renderInput} />
        </FormGroup>

        <Button type="submit" outline color="info">Login</Button>
      </Form>
    );
  }
}

const validate = values => {
  const errors = {};
  if(!values.identifier) {
    errors.identifier = 'Username / Email is Required';
  }
  if(!values.password) {
    errors.password = 'Password is Required';
  }
  return errors;
}

const form = reduxForm({
  form: 'LoginForm',
  validate
});

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    flashMessages: state.flashMessages
  };
}


export default withRouter(connect(mapStateToProps, { login, addFlashMessage })(form(LoginForm)));
