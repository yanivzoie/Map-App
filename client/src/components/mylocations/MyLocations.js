import React, { Component } from 'react';
import './index.scss';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroupItem,
  ListGroup,
  NavLink,
  Alert,
} from 'reactstrap';
import { connect } from 'react-redux';
import { getItems } from '../../redux/actions/locationsActions';
import { clearErrors } from '../../redux/actions/errorActions';

class MyLocations extends Component {
  state = {
    modal: false,
    name: '',
    location: '',
    msg: null,
  };

  async componentDidMount() {
    await this.props.getItems();
  }
  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // If authenticated, close modal
    if (this.state.modal) {
      if (!isAuthenticated) {
        this.toggle();
      }
    }
  }
  toggle = () => {
    // Clear errors
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    // Attempt to add location
    this.props.getItems();

    // this.toggle();
  };

  render() {
    const locations = this.props.locations.items.map((item, idx) => (
      <ListGroupItem tag="button" action key={idx}>
        {item.locationName}
      </ListGroupItem>
    ));
    return (
      <div>
        <NavLink onClick={this.toggle} href="#">
          My-Locations
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>My Locations</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <ListGroup>{locations}</ListGroup>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  locations: state.locations,
});

export default connect(mapStateToProps, { getItems, clearErrors })(MyLocations);
