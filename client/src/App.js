import {useEffect} from 'react';
import AppNavBar from './layouts/AppNavBar';
import ShoppingList from './components/shopping/List';
import { Provider } from 'react-redux';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {loadUser} from './actions/authActions';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavBar />
        <ShoppingList />
      </div>
    </Provider>
  );
}

export default App;
