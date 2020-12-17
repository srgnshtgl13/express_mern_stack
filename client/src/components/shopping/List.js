import { useEffect } from "react";
import { getItems, deleteItem } from "../../actions/itemActions";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import ItemModal from "./ItemModal";

const ShoppingList = (props) => {
  const itemState = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const _deleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Container>
      <ItemModal items={itemState.items} />
      <ListGroup>
        {itemState.loading && <p>Loading...</p>}
        <TransitionGroup>
          {itemState.items.length > 0 &&
            itemState.items.map((item, idx) => (
              <CSSTransition
                timeout={{ enter: 0, exit: 300 }}
                classNames="fade"
                key={idx}
              >
                <ListGroupItem>
                  <Button
                    style={{ marginRight: "5%" }}
                    color="danger"
                    title="delete"
                    onClick={() => _deleteItem(item._id)}
                  >
                    X
                  </Button>
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            ))}
        </TransitionGroup>
        {!itemState.loading && itemState.items.length === 0 && <p>No Data!</p>}
      </ListGroup>
    </Container>
  );
};

ShoppingList.propTypes = {
  getItems: PropTypes.func.isRequired,
  itemState: PropTypes.object.isRequired,
  deleteItem: PropTypes.func,
};

export default ShoppingList;
