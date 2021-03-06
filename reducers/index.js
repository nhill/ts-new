import { combineReducers } from 'redux';
import places from './places_reducer';
import auth from './auth_reducer';
import { AsyncStorage } from 'react-native';
import { persistStore, REHYDRATE, persistCombineReducers } from 'redux-persist';

const config = {
  key: 'primary',
  storage: AsyncStorage
};

export default persistCombineReducers(config, {
  places,
  auth
});
