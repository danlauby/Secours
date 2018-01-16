import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSharedContent } from '../../actions/shareActions';
import TextFieldGroup from '../common/TextFieldGroup';


class ShareContentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      errors: {},
      isLoading: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createSharedContent(this.state);
  }

  handleChange(e) {
    this.setState({ [e.target.content]: e.target.value });
  }

  render() {
    const { content, errors, isLoading } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Share Articles & Blogs with Everyone!</h1>

      { errors.form && <div className="alert alert-danger">{errors.form}</div> }

      <TextFieldGroup
        field="content"
        label="content"
        value={content}
        error={errors.content}
        onChange={this.handleChange}
      />

    <button type="submit" disabled={isLoading} className="btn btn-primary btn-lg">Share</button>
      </form>
    );
  }
}

ShareContentForm.propTypes = {
  createSharedContent: PropTypes.func.isRequired
}

export default connect(null, { createSharedContent })(ShareContentForm);
