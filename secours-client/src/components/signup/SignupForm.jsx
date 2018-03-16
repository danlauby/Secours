import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

import TextFieldGroup from '../common/TextFieldGroup';


function validateInput(data) {
  let errors = {};
  if (Validator.isEmpty(data.username)) {
    errors.username = 'This field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'This field is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'This field is required';
  }
  if (Validator.isEmpty(data.passwordConfirmation)) {
    errors.passwordConfirmation = 'This field is required';
  }
  if (!Validator.equals(data.password, data.passwordConfirmation)) {
    errors.passwordConfirmation = 'Passwords must match';
  }
  if (Validator.isEmpty(data.zipcode)) {
    errors.zipcode = 'This field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      zipcode: '',
      errors: {},
      isLoading: false,
      invalid: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
    this.isValid = this.isValid.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  checkUserExists(e) {
    const field = e.target.name;
    const val = e.target.value;
    if (val !== '') {
      this.props.isUserExists(val).then(res => {
        let errors = this.state.errors;
        let invalid;
        if (res.data.user) {
          errors[field] = 'This ' + field + ' already exists';
          invalid = true;
        } else {
          errors[field] = '';
          invalid = false;
        }
        this.setState({ errors, invalid });
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.isValid()) {
      // this.setState({ errors: {}, isValid: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.context.router.history.push('/');
        },
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      );
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Join Our Community!</h1>

        <TextFieldGroup
          error={errors.username}
          label="Username"
          name="username"
          onChange={this.handleChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />

        <TextFieldGroup
          error={errors.email}
          label="Email"
          name="email"
          onChange={this.handleChange}
          checkUserExists={this.checkUserExists}
          value={this.state.email}
          field="email"
        />

        <TextFieldGroup
          error={errors.password}
          label="Password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
          field="password"
        />

        <TextFieldGroup
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          name="passwordConfirmation"
          onChange={this.handleChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
        />

        <TextFieldGroup
          error={errors.zipcode}
          label="Zip/Postal Code"
          name="zipcode"
          onChange={this.handleChange}
          checkUserExists={this.checkUserExists}
          value={this.state.zipcode}
          field="zipcode"
        />


        <div className="form-group">
          <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
            Signup
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  isUserExists: PropTypes.func.isRequired
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(SignupForm);








// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, SubmissionError } from 'redux-form';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';
// import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
//
// class SignupForm extends Component {
//
//   signupSubmit = (values) => {
//     this.props.userSignupRequest(values).then(
//       () => {
//         this.props.addFlashMessage({
//           type: 'success',
//           text: `You have signed up successfully, welcome ${values.username}!`
//         });
//         this.context.router.history.push('/');
//       }
//     );
//   }
//
// //    signupSubmit(values) {
// //   return this.props.isUserExists(values.username, values.email).then((res) => {
// //     if (res.data.user) {
// //       console.log('USER', res.data.user);
// //       console.log('RESPONSE', res.data.user.username + ' ' + res.data.user.email);
// //       console.log('FORM VALUES', values.username + ' ' + values.email);
// //
// //       if (res.data.user.username.includes(values.username)) {
// //         throw new SubmissionError({
// //           username: 'Username Already Exists',
// //           _error: 'Login failed!'
// //         })
// //       }
// //       else if (res.data.user.email.includes(values.email)) {
// //         throw new SubmissionError({
// //           email: 'Email Already Exists',
// //           _error: 'Login failed!'
// //         })
// //       } else if (values.password !== 'redux-form') {
// //         throw new SubmissionError({
// //           password: 'Wrong password',
// //           _error: 'Login failed!'
// //         })
// //       } else {
// //         window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
// //       }
// //     }
// //   })
// // }
//
//   renderInput = ({ input, label, type, meta: { asyncValidating, touched, error } }) =>
//   <div>
//     <Label>{label}</Label>
//     <Input type={type} {...input} valid={error && touched ? false : null } />
//     <FormFeedback>
//       {error && touched ? <span>{error}</span> : ''}
//     </FormFeedback>
//   </div>
//
//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <Form onSubmit={handleSubmit(this.signupSubmit.bind(this))}>
//         <h1>Signup</h1>
//         <FormGroup>
//           <Field name="username" type="text" label="Username" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="email" type="email" label="Email" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="password" type="password" label="Password" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="passwordConfirmation" type="password" label="Password Confirmation" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="zipcode" type="zipcode" label="Zip / Postal Code" component={this.renderInput} />
//         </FormGroup>
//
//         <Button type="submit" outline color="info">Signup</Button>
//       </Form>
//     );
//   }
// }
//
// const validate = (values) => {
//   const errors = {};
//   if(!values.username) {
//     errors.username = 'Username is Required';
//   }
//   if(!values.email) {
//     errors.email = 'Email is Required';
//   }
//   if(!values.password) {
//     errors.password = 'Password is Required';
//   }
//   if(!values.passwordConfirmation) {
//     errors.passwordConfirmation = 'Password Confirmation is Required';
//   }
//   if(!values.zipcode) {
//     errors.zipcode = 'Zip / Postal Code is Required';
//   }
//   return errors;
// }
//
// const asyncValidate = (values) => {
//   console.log(values.username);
//   return this.props.isUserExists(values.username, values.email).then((res) => {
//     if (res.data.user) {
//       console.log('USER', res.data.user);
//       console.log('RESPONSE', res.data.user.username + ' ' + res.data.user.email);
//       console.log('FORM VALUES', values.username + ' ' + values.email);
//
//       if (res.data.user.username.includes(values.username)) {
//         throw { username: 'That username is taken' }
//       }
//       else if (res.data.user.email.includes(values.email)) {
//         throw { email: 'That email is taken' }
//       }
//     }
//   })
// }
//
// const form = reduxForm({
//   form: 'SignupForm',
//   validate,
//   asyncValidate,
//   asyncBlurFields: ['username', 'email']
// });
//
// SignupForm.propTypes = {
//   userSignupRequest: PropTypes.func.isRequired,
//   addFlashMessage: PropTypes.func.isRequired,
//   isUserExists: PropTypes.func.isRequired
// }
//
// SignupForm.contextTypes = {
//   router: PropTypes.object.isRequired
// }
//
// export default form(SignupForm);


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { Field, reduxForm, SubmissionError } from 'redux-form';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';
// import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
// import { addFlashMessage } from '../../actions/flashMessages';
// import { userSignupRequest, validateUser, validateUserRejected, validateUserFulfilled, resetValidateUser } from '../../actions/signupActions';
//
//
//
// function validate(values) {
//   var errors = {};
//   var hasErrors = false;
//
//
//   if (!values.username || values.username.trim() === '') {
//     errors.username = 'Enter username';
//     hasErrors = true;
//   }
//   if (!values.email || values.email.trim() === '') {
//     errors.email = 'Enter email';
//     hasErrors = true;
//   }
//   if (!values.password || values.password.trim() === '') {
//     errors.password = 'Enter password';
//     hasErrors = true;
//   }
//   if (!values.passwordConfirmation || values.passwordConfirmation.trim() === '') {
//     errors.passwordConfirmation = 'Enter Confirm Password';
//     hasErrors = true;
//   }
//
//   if (values.passwordConfirmation && values.passwordConfirmation.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.passwordConfirmation) {
//     errors.password = 'Password And Confirm Password don\'t match';
//     errors.password = 'Password And Confirm Password don\'t match';
//     hasErrors = true;
//   }
//
//   if (!values.zipcode || values.zipcode.trim() === '') {
//     errors.zipcode = 'Enter zip / postal code';
//     hasErrors = true;
//   }
//
//   return hasErrors && errors;
// }
//
// // const asyncValidate = (values, dispatch) => {
// //   return dispatch(validateUser(values))
// //     .then((result) => {
// //       //Note: Error's "data" is in result.payload.response.data
// //       // success's "data" is in result.payload.data
// //       if (!result.payload.response) { //1st onblur
// //         return;
// //       }
// //
// //       let {data, status} = result.payload.response;
// //
// //       //if status is not 200 or any one of the fields exist, then there is a field error
// //       if (status != 200 || data.username || data.email) {
// //         //let other components know of error by updating the redux` state
// //         dispatch(validateUserRejected(data));
// //         throw data;
// //       } else {
// //         //let other components know that everything is fine by updating the redux` state
// //         dispatch(validateUserFulfilled(data)); //ps: this is same as dispatching RESET_USER_FIELDS
// //       }
// //     });
// // };
//
// // const asyncValidate = (values, dispatch) => {
// //  return new Promise((resolve, reject) => {
// //    dispatch(validateUser(values))
// //     .then((response) => {
// //        let data = response.payload.data;
// //        let status = response.payload.status;
// //        //if there is an error
// //        if(status != 200 || data.user) {
// //          //let other comps know of error by updating redux` state
// //          dispatch(validateUserRejected(response.payload));
// //          reject(data); //this is for redux-form itself
// //         } else {
// //           //let other comps know success by updating redux` state
// //           dispatch(validateUserFulfilled(response.payload));
// //           resolve();//this is for redux-form itself
// //        }
// //      }); //dispatch
// //  }); //promise
// // };
//
//
// class SignupForm extends Component {
//
//   static contextTypes = {
//     router: PropTypes.object
//   };
//
//   componentWillMount() {
//     //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
//     //always reset that global state back to null when you REMOUNT
//     this.props.resetMe();
//   }
//
//   // componentWillReceiveProps(nextProps) {
//   //   if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
//   //     this.context.router.push('/');
//   //   }
//   // }
//
//   signupSubmit = (values) => {
//     userSignupRequest(values).then(
//       () => {
//         addFlashMessage({
//           type: 'success',
//           text: `You have signed up successfully, welcome ${values.username}!`
//         });
//         this.context.router.history.push('/');
//       }
//     );
//   }
//
//   // signupSubmit(values) {
//   //   return this.props.isUserExists(values.username, values.email).then((res) => {
//   //     if (res.data.user) {
//   //       console.log('USER', res.data.user);
//   //       console.log('RESPONSE', res.data.user.username + ' ' + res.data.user.email);
//   //       console.log('FORM VALUES', values.username + ' ' + values.email);
//   //
//   //       if (res.data.user.username.includes(values.username)) {
//   //         throw new SubmissionError({
//   //           username: 'Username Already Exists',
//   //           _error: 'Login failed!'
//   //         })
//   //       }
//   //       if (res.data.user.email.includes(values.email)) {
//   //         throw new SubmissionError({
//   //           email: 'Email Already Exists',
//   //           _error: 'Login failed!'
//   //         })
//   //       } else if (values.password !== 'redux-form') {
//   //         throw new SubmissionError({
//   //           password: 'Wrong password',
//   //           _error: 'Login failed!'
//   //         })
//   //       } else {
//   //         window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
//   //       }
//   //     }
//   //   })
//   // }
//
//
//
//   renderInput = ({ input, label, type, meta: { asyncValidating, touched, error } }) =>
//   <div className={asyncValidating ? 'async-validating' : ''}>
//     <Label>{label}</Label>
//     <Input type={type} {...input} valid={error && touched ? false : null } />
//     <FormFeedback>
//       {error && touched ? <span>{error}</span> : ''}
//     </FormFeedback>
//   </div>
//
//   render() {
//     const { handleSubmit } = this.props;
//     return (
//       <Form onSubmit={handleSubmit(this.signupSubmit.bind(this))}>
//         <h1>Signup</h1>
//         <FormGroup>
//           <Field name="username" type="text" label="Username" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="email" type="email" label="Email" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="password" type="password" label="Password" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="passwordConfirmation" type="password" label="Password Confirmation" component={this.renderInput} />
//         </FormGroup>
//         <FormGroup>
//           <Field name="zipcode" type="zipcode" label="Zip / Postal Code" component={this.renderInput} />
//         </FormGroup>
//
//         <Button type="submit" outline color="info">Signup</Button>
//       </Form>
//     );
//   }
// }
//
//
//
// // const validate = (values) => {
// //   const errors = {};
// //   if(!values.username) {
// //     errors.username = 'Username is Required';
// //   }
// //   if(!values.email) {
// //     errors.email = 'Email is Required';
// //   }
// //   if(!values.password) {
// //     errors.password = 'Password is Required';
// //   }
// //   if(!values.passwordConfirmation) {
// //     errors.passwordConfirmation = 'Password Confirmation is Required';
// //   }
// //   if(!values.zipcode) {
// //     errors.zipcode = 'Zip / Postal Code is Required';
// //   }
// //   return errors;
// // }
//
// export default reduxForm({
//   form: 'SignUpForm',
//   validate,
//   // asyncValidate
// })(SignupForm)
//
// SignupForm.propTypes = {
//   // userSignupRequest: PropTypes.func.isRequired,
//   // addFlashMessage: PropTypes.func.isRequired,
//   // isUserExists: PropTypes.func.isRequired
// }
//
// // SignupForm.contextTypes = {
// //   router: PropTypes.object.isRequired
// // }
//
// // export default form(SignupForm);








// import React from 'react';
// import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import Validator from 'validator';
// import isEmpty from 'lodash/isEmpty';
//
// import TextFieldGroup from '../common/TextFieldGroup';
//
//
// function validateInput(data) {
  //   let errors = {};
  //   if (Validator.isEmpty(data.email)) {
    //     errors.username = 'This field is required';
    //   }
    //   if (Validator.isEmpty(data.email)) {
      //     errors.email = 'This field is required';
      //   }
      //   if (!Validator.isEmail(data.email)) {
        //     errors.email = 'Email is invalid';
        //   }
        //   if (Validator.isEmpty(data.password)) {
          //     errors.password = 'This field is required';
          //   }
          //   if (Validator.isEmpty(data.passwordConfirmation)) {
            //     errors.passwordConfirmation = 'This field is required';
            //   }
            //   if (!Validator.equals(data.password, data. passwordConfirmation)) {
              //     errors.passwordConfirmation = 'Passwords must match';
              //   }
              //   if (Validator.isEmpty(data.zipcode)) {
                //     errors.zipcode = 'This field is required';
                //   }
                //   return {
                  //     errors,
                  //     isValid: isEmpty(errors)
                  //   }
                  // }
                  //
                  // class SignupForm extends React.Component {
                    //
                    //   constructor(props) {
                      //     super(props);
                      //     this.state = {
                        //       username: '',
                        //       email: '',
                        //       password: '',
                        //       passwordConfirmation: '',
                        //       zipcode: '',
                        //       errors: {},
                        //       isLoading: false,
                        //       invalid: false
                        //     }
                        //     this.handleChange = this.handleChange.bind(this);
                        //     this.handleSubmit = this.handleSubmit.bind(this);
                        //     this.checkUserExists = this.checkUserExists.bind(this);
                        //     this.isValid = this.isValid.bind(this);
                        //   }
                        //
                        //   handleChange(e) {
                          //     this.setState({ [e.target.name]: e.target.value });
                          //   }
                          //
                          //   isValid() {
                            //     const { errors, isValid } = validateInput(this.state);
                            //
                            //     if (!isValid) {
                              //       this.setState({ errors });
                              //     }
                              //
                              //     return isValid;
                              //   }
                              //
                              // checkUserExists(e) {
                              //   const field = e.target.name;
                              //   const val = e.target.value;
                              //   if (val !== '') {
                              //     this.props.isUserExists(val).then(res => {
                              //       let errors = this.state.errors;
                              //       let invalid;
                              //       if (res.data.user) {
                              //         errors[field] = 'This ' + field + ' already exists';
                              //         invalid = true;
                              //       } else {
                              //         errors[field] = '';
                              //         invalid = false;
                              //       }
                              //       this.setState({ errors, invalid });
                              //     });
                              //   }
                              // }
                                        //
                                        //   handleSubmit(e) {
                                          //     e.preventDefault();
                                          //     if (this.isValid()) {
                                            //       // this.setState({ errors: {}, isValid: true });
                                            //       this.props.userSignupRequest(this.state).then(
                                              //         () => {
                                                //           this.props.addFlashMessage({
                                                  //             type: 'success',
                                                  //             text: 'You signed up successfully. Welcome!'
                                                  //           });
                                                            // this.context.router.history.push('/');
                                                  //         },
                                                  //         (err) => this.setState({ errors: err.response.data, isLoading: false })
                                                  //       );
                                                  //     }
                                                  //   }
                                                  //
                                                  //   render() {
                                                    //     const { errors } = this.state;
                                                    //
                                                    //     return (
                                                      //       <form onSubmit={this.handleSubmit}>
                                                      //         <h1>Join Our Community!</h1>
                                                    //
                                                    // <TextFieldGroup
                                                    //   error={errors.username}
                                                    //   label="Username"
                                                    //   name="username"
                                                    //   onChange={this.handleChange}
                                                      // checkUserExists={this.checkUserExists}
                                                    //   value={this.state.username}
                                                    //   field="username"
                                                    // />
                                                  //
                                                  // <TextFieldGroup
                                                  //   error={errors.email}
                                                  //   label="Email"
                                                  //   name="email"
                                                  //   onChange={this.handleChange}
                                                  //   checkUserExists={this.checkUserExists}
                                                  //   value={this.state.email}
                                                  //   field="email"
                                                  // />
                                                //
                                                // <TextFieldGroup
                                                //   error={errors.password}
                                                //   label="Password"
                                                //   name="password"
                                                //   onChange={this.handleChange}
                                                //   value={this.state.password}
                                                //   field="password"
                                                // />
                                              //
                                              // <TextFieldGroup
                                              //   error={errors.passwordConfirmation}
                                              //   label="Password Confirmation"
                                              //   name="passwordConfirmation"
                                              //   onChange={this.handleChange}
                                              //   value={this.state.passwordConfirmation}
                                              //   field="passwordConfirmation"
                                              // />
                                            //
                                            // <TextFieldGroup
                                            //   error={errors.zipcode}
                                            //   label="Zip/Postal Code"
                                            //   name="zipcode"
                                            //   onChange={this.handleChange}
                                            //   checkUserExists={this.checkUserExists}
                                            //   value={this.state.zipcode}
                                            //   field="zipcode"
                                            // />
                                          //
                                          //
                                          // <div className="form-group">
                                          //   <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                                          //     Signup
                                          //   </button>
                                        // </div>
                                      //       </form>
                                    //     );
                                    //   }
                                    // }
                                    //
                                    // SignupForm.propTypes = {
                                      //   userSignupRequest: PropTypes.func.isRequired,
                                      //   addFlashMessage: PropTypes.func.isRequired,
                                      //   isUserExists: PropTypes.func.isRequired
                                      // }
                                      //
                                      // SignupForm.contextTypes = {
                                      //     router: PropTypes.object.isRequired
                                      //   }
                                        //
                                        // export default withRouter(SignupForm);
