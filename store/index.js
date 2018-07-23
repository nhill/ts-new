import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, REHYDRATE, persistCombineReducers } from 'redux-persist';


const store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk))
);

persistStore(store, null, () => { store.getState() });

export default store;
