import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';


class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbar-text navbar-right">
        <li><Link to="/doctors" className="navbar-right">Doctors</Link></li>
        <li><Link to="/content" className="navbar-right">Content</Link></li>
        <li><a href="/" onClick={this.handleLogout}>Logout</a></li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-text navbar-right">
        <li><Link to="/signup" className="navbar-right">Signup</Link></li>
        <li><Link to="/login" className="navbar-right">Login</Link></li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-lg navbar-dark navbar-full text-light bg-dark">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Secours</Link>
          </div>
            { isAuthenticated ? userLinks : guestLinks }
          <div>
          </div>
        </div>
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);
