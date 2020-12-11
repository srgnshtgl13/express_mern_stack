import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { addItem } from "../../actions/itemActions";
import PropTypes from "prop-types";

const ItemModal = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const _toggleModal = () => setModalOpen(!modalOpen);
  const _formSubmit = (e) => {
    e.preventDefault();
    dispatch(addItem({ name }));
    _toggleModal();
  };
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
          <Form onSubmit={_formSubmit}>
            <FormGroup>
              <Label for="item">Name</Label>
              <Input id="item" type="text" name="name" onChange={_onChange} />
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
