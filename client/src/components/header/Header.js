import React from 'react';
import { Link } from 'react-router-dom';
import SignUp from '../register/SignUp';
import HomePage from '../homepage/HomePage';
const Header = () => {
  return (
    <div className="header">
      <Router>
        <h1>MAP</h1>
        <ul className="nav-list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/users/1">Users</NavLink>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/users/:pageNumber?" component={Users} />
          <Route path="/user/:userId?" component={User} />
        </Switch>
      </Router>
    </div>
  );
};

export default Header;
