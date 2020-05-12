import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getItems, addItem } from '../../redux/actions/locationsActions';
import { clearErrors } from '../../redux/actions/errorActions';
import './index.scss';
import { Button } from 'reactstrap';
import Geocode from 'react-geocode';

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: '',
      lat: null,
      lng: null,
      venues: [],
      locations: [],
      markers: [],
    };
  }
  componentDidMount() {
    this.getVenues();
  }

  renderMap = () => {
    loadScript(
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCVBthtEmWi0Ul8mejDQrBlOULXB1kTB3I&callback=initMap'
    );
    window.initMap = this.initMap;
    const locations = this.props.locations.items.map((item) => item);
    this.setState({
      locations: locations.coords,
    });
  };
  save = () => {
    const { locationName, lat, lng } = this.state;

    const location = {
      locationName,
      lat,
      lng,
    };

    this.props.addItem(location);
  };

  getVenues = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 300);
    });
    promise.then(() => {
      this.renderMap();
    });
  };

  initMap = () => {
    // Get Items
    this.props.getItems();
    const locations = this.props.locations.items.map((item) => item);
    this.setState({ locations: locations });

    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 32.109333, lng: 34.855499 },
      zoom: 8,
    });

    const getLocationName = () => {
      Geocode.setApiKey('AIzaSyCuwENWB9D1yZo1W0VONjWq4osmBhL4mF8');
      Geocode.fromLatLng(this.state.lat, this.state.lng).then(
        (response) => {
          const address = response.results[0].formatted_address;
          console.log(address);
          this.setState({ locationName: address });
        },
        (error) => {
          console.error(error);
        }
      );
    };

    // Add Marker Func
    const addMarker = (latLng) => {
      new window.google.maps.Marker({
        map: map,
        position: latLng,
        title: getLocationName(),
        draggable: true,
      });
    };
    // EventListener Calling addMarker
    map.addListener('click', (e) => {
      this.setState({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
      addMarker(e.latLng);
    });

    // Create An InfoWindow
    var infowindow = new window.google.maps.InfoWindow();

    // Display Dynamic Markers
    this.state.locations.map((item) => {
      var contentString = `${item.locationName}`;

      // Display A Marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: item.coords.lat,
          lng: item.coords.lng,
        },
        map: map,
        title: item.LocationName,
      });

      // Click on A Marker!
      marker.addListener('click', () => {
        // Change the content
        infowindow.setContent(contentString);

        // Open An InfoWindow
        infowindow.open(map, marker);
      });
    });
  };
  render() {
    return (
      <main>
        <div id="floating-panel">
          <Button onClick={this.save} color="dark" style={{ margin: '0.2rem' }}>
            Save
          </Button>
          <Button color="dark" style={{ margin: '0.2rem' }}>
            Show All Markers
          </Button>
          <Button color="dark" style={{ margin: '0.2rem' }}>
            Delete Markers
          </Button>
        </div>

        <div id="map"></div>
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName('script')[0];
  var script = window.document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

const mapStateToProps = (state) => ({
  locations: state.locations,
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { getItems, addItem, clearErrors })(
  MapContainer
);
