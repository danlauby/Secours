import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


class FlashMessage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.deleteFlashMessage(this.props.message.id);
  }

  render() {
    const { type, text } = this.props.message;
    return (
      <div className={classnames('alert', {
          'alert-success': type === 'success',
          'alert-danger': type === 'error'
        })}>
        <button onClick={this.handleClose} className="close"><span>&times;</span></button>
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired,
  deleteFlashMessage: PropTypes.func.isRequired
}

export default FlashMessage;
