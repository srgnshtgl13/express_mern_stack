import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";
import { addItem } from "../../actions/itemActions";
import { clearErrors } from "../../actions/errorActions";
import PropTypes from "prop-types";

const ItemModal = (props) => {
  const dispatch = useDispatch();
  const errorState = useSelector((state) => state.error);

  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");

  const _toggleModal = () => {
    dispatch(clearErrors());
    setModalOpen(!modalOpen);
  };

  const _formSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ name }));
    // _toggleModal();
  };

  useEffect(() => {
    if (errorState.msg) {
      setMsg(errorState.msg.msg);
    }
  }, [errorState]);

  const _onChange = (e) => setName(e.target.value);
  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem", marginTop: "2rem" }}
        onClick={_toggleModal}
      >
        Add Item
      </Button>
      <Modal isOpen={modalOpen} toggle={_toggleModal}>
        <ModalHeader toggle={_toggleModal}>
          Add Item To Shopping List
        </ModalHeader>
        <ModalBody>
          {msg ? (
            <Alert color="danger">{msg}</Alert>
          ) : null}
          <Form onSubmit={_formSubmit}>
            <FormGroup>
              <Label for="item">Name</Label>
              <Input id="item" type="text" name="name" onChange={_onChange} value={name} />
            </FormGroup>
            <Button type="submit" block>
              Add
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};
ItemModal.propTypes = {
  addItem: PropTypes.func,
};
export default ItemModal;
