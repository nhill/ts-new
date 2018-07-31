import { FETCH_PLACES } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_PLACES:
      return { places: action.payload }

    default:
      return state;
  }
}
