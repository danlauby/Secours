import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { fetchDoctors } from '../../actions/doctorsActions';


class DoctorSearchForm extends Component {

  searchDoctorsSubmit = (values) => {
    this.props.fetchDoctors(values, this.props.userLocation);
  }

  renderInput = ({ input, meta, label, type, placeholder }) =>
  <div>
    <Label>{label}</Label>
    <Input className="condition-input" type={type} autoFocus placeholder={placeholder} {...input} valid={meta.error && meta.touched ? false : null }/>
    <FormFeedback >
      {meta.error && meta.touched ? <span>{meta.error}</span> : ''}
    </FormFeedback>
  </div>

  render() {
    const { handleSubmit, userLocation } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.searchDoctorsSubmit.bind(this))}>
        <FormGroup>
          <Field name="condition" type="text" placeholder="All Doctors" label="Condition / Speciality" component={this.renderInput} />
        </FormGroup>

        <Button type="submit" outline color="success" disabled={userLocation.fetched}>Search Doctors</Button>
      </Form>
    );
  }
}

// const validate = values => {
//   const errors = {};
//   if(!values.condition) {
//     errors.condition = 'Condition is Required';
//   }
//   return errors;
// }

const form = reduxForm({
  form: 'SearchDoctorsForm',
  // validate
});

function mapStateToProps(state) {
  return {
    userLocation: state.geoLocation.coords
  }
}

DoctorSearchForm.propTypes = {
  fetchDoctors: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
}


export default withRouter(connect(mapStateToProps, { fetchDoctors })(form(DoctorSearchForm)));
