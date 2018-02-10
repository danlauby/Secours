import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchDoctors } from '../../actions/doctorsActions';

import TextFieldGroup from '../../components/common/TextFieldGroup';


class DoctorSearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      condition: '',
      placeholder: 'All Doctors'
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
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextFieldGroup
            type="text"
            label="Condition"
            onChange={this.handleChange}
            name="condition"
            value={this.state.condition}
            placeholder={this.state.placeholder}
            field="condition"
            />
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-lg">Search Doctors</button>
          </div>
        </form>
      </div>
    );
  }
}

DoctorSearchForm.propTypes = {
  fetchDoctors: PropTypes.func.isRequired
}

export default connect(null, { fetchDoctors })(DoctorSearchForm);
