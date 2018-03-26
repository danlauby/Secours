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
    const { handleSubmit, userLocation, coordsFetched } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.searchDoctorsSubmit.bind(this))}>
        <FormGroup>
          <Field name="condition" type="text" placeholder="All Doctors" label="Condition / Speciality" component={this.renderInput} />
        </FormGroup>

        <Button type="submit" color="success" disabled={!coordsFetched}>Search Doctors</Button>
      </Form>
    );
  }
}


const form = reduxForm({
  form: 'SearchDoctorsForm'
});

function mapStateToProps(state) {
  return {
    userLocation: state.geoLocation.coords,
    fetching: state.doctors.fetching,
    coordsFetched: state.geoLocation.fetched
  }
}

DoctorSearchForm.propTypes = {
  fetchDoctors: PropTypes.func.isRequired,
  userLocation: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired
}


export default withRouter(connect(mapStateToProps, { fetchDoctors })(form(DoctorSearchForm)));
