import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import PropTypes from "prop-types";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
    if(this.state.modal && isAuthenticated) {
        this._toggle();
    }
  }

  _toggle = () => {
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };
  _onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  _onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.props.register({ name, email, password });
    // this._toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this._toggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this._toggle}>
          <ModalHeader toggle={this._toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this._onSubmit}>
              <FormGroup>
                <Label for="name">* Name</Label>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  onChange={this._onChange}
                  placeholder="Jane Doe"
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">* Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  onChange={this._onChange}
                  placeholder="jane-doe@mail.com"
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">* Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  onChange={this._onChange}
                  placeholder="******"
                />
              </FormGroup>
              <Button type="submit" block>
                Register
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
const mapDispatchers = { register, clearErrors };
export default connect(mapStateToProps, mapDispatchers)(RegisterModal);
