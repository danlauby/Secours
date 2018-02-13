import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign up</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Secours</Link>
          </div>

          <div className="collapse navbar-collapse">
            { isAuthenticated ? userLinks : guestLinks }
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

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { logout })(NavigationBar);




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { logout } from '../actions/authActions';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem } from 'reactstrap';
//
//
// class NavigationBar extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       isOpen: false
//     };
//     this.handleLogout = this.handleLogout.bind(this);
//   }
//
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     });
//   }
//
//   handleLogout(e) {
//     e.preventDefault();
//     this.props.logout();
//   }
//
//   render() {
//     const { isAuthenticated } = this.props.auth;
//
//     const userLinks = (
//       <div>
//         <NavItem>
//           <NavLink href="/doctors">Doctors</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink href="/content">Articles</NavLink>
//         </NavItem>
//         <UncontrolledDropdown nav inNavbar>
//           <DropdownToggle nav caret>
//             Options
//           </DropdownToggle>
//           <DropdownMenu >
//             <DropdownItem>
//               Option 1
//             </DropdownItem>
//             <DropdownItem>
//               Option 2
//             </DropdownItem>
//             <DropdownItem divider />
//             <DropdownItem>
//               <NavLink href="/" onClick={this.handleLogout}>Logout</NavLink>
//             </DropdownItem>
//           </DropdownMenu>
//         </UncontrolledDropdown>
//       </div>
//     )
//
//     const guestLinks = (
//       <div>
//         <NavItem>
//           <NavLink href="/signup">Signup</NavLink>
//         </NavItem>
//         <NavItem>
//           <NavLink href="/login">Login</NavLink>
//         </NavItem>
//       </div>
//     )
//
//
//
//     return (
//       <div>
//         <Navbar color="faded" light expand="md">
//           <NavbarBrand href="/">Secours</NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               { isAuthenticated ? userLinks : guestLinks }
//
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//
//
//     );
//   }
// }
//
//
// // <nav className="navbar navbar-expand-lg navbar-dark navbar-full text-light bg-dark">
// //   <div className="container-fluid">
// //     <div className="navbar-header">
// //       <Link to="/" className="navbar-brand">Secours</Link>
// //     </div>
// //     { isAuthenticated ? userLinks : guestLinks }
// //     <div>
// //     </div>
// //   </div>
// // </nav>
//
// NavigationBar.propTypes = {
//   auth: PropTypes.object.isRequired,
//   logout: PropTypes.func.isRequired
// }
//
// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth
//   };
// }
//
// export default connect(mapStateToProps, { logout })(NavigationBar);
