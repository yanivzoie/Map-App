import React, { Component, Fragment } from 'react';
import Logout from '../logout/Logout';
import Login from '../login/Login';
import Register from '../register/Register';
// import AddLocations from '../addlocations/AddLocations';
import MyLocations from '../mylocations/MyLocations';
import { getItems } from '../../redux/actions/locationsActions';
import { connect } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { clearErrors } from '../../redux/actions/errorActions';
import './index.scss';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
} from 'reactstrap';

export class AppNavbar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  locations = async () => {
    await this.props.getItems();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong>{user ? `Welcome ${user.user.name}` : ''}</strong>
          </span>
        </NavItem>
        {/* <NavItem>
          <AddLocations />
        </NavItem> */}
        <NavItem onClick={this.locations}>
          <MyLocations />
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <Register />
        </NavItem>
        <NavItem>
          <Login />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-1">
          <Container>
            <NavbarBrand href="/">Yaniv Zoie</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error,
  };
};

export default connect(mapStateToProps, { getItems, register, clearErrors })(
  AppNavbar
);
