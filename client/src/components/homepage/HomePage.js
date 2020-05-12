import React, { Component } from 'react';
import store from '../../stroe';
import { loadUser } from '../../redux/actions/authActions';
import MapContainer from '../map/MapContainer';

import './index.scss';

class HomePage extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="container">
        <MapContainer />
      </div>
    );
  }
}
export default HomePage;
