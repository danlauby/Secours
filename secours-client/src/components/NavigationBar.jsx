import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';



  class NavigationBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      };
      this.handleLogout = this.handleLogout.bind(this);
      this.toggle = this.toggle.bind(this);
    }

    handleLogout(e) {
      e.preventDefault();
      this.props.logout();
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render() {
      const { isAuthenticated } = this.props.auth;
      const userLinks = (
        <Nav>
          <NavItem>
            <NavLink href="/doctors">Doctors</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/content">Articles</NavLink>
          </NavItem>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              {this.props.auth.user.username}
            </DropdownToggle>
            <DropdownMenu >
              <DropdownItem>
                <Link to="/">Profile</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to="/" onClick={this.handleLogout}>Logout</Link>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      )

      const guestLinks = (
        <Nav>
          <NavItem>
            <NavLink href="/signup">Signup</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
        </Nav>
      )

      return (
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Secours</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                { isAuthenticated ? userLinks : guestLinks }

              </Nav>
            </Collapse>
          </Navbar>
        </div>
      );
    }
  }

  NavigationBar.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  function mapStateToProps(state) {
    return {
      auth: state.auth
    };
  }

  export default connect(mapStateToProps, { logout })(NavigationBar);
