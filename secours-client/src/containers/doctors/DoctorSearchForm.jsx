import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDoctors } from '../../actions/doctorsActions';


import TextFieldGroup from '../../components/common/TextFieldGroup';


class DoctorSearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      issue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.fetchDoctors(this.state);
    console.log('Form', this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            type="text"
            label="Issue"
            onChange={this.handleChange}
            name="issue"
            value={this.state.issue}
            field="issue"
            />

          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Search Doctors</button>
          </div>
        </form>
      </div>
    )
  }
}

DoctorSearchForm.propTypes = {
  fetchDoctors: PropTypes.func.isRequired
}

export default connect(null, { fetchDoctors })(DoctorSearchForm);
