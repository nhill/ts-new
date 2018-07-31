import axios from 'axios';
import { dispatch } from 'react-redux';
import  reverseGeocode from 'latlng-to-zip';
import { stringify } from 'qs';
import { keys } from '../config/keys';

import {
  FETCH_PLACES
} from './types';

export const fetchPlaces = (region, query, callback) => async (dispatch) => {
  try{
    // data is contained in response.data so deconstruct
    let { data } = await axios.get(buildPlacesURL(region, query));
    dispatch({ type: FETCH_PLACES, payload: data });
    callback();
  }catch(e){
    console.log(e);
  }
};

const buildPlacesURL = (region, query, radius, type) => {
  if(!radius){
    radius = 2000;
  }
  if(!type){
    type = 'search';
  }


  var urlSegment = '';
  var params = {
    key: keys.googleApiKey,
  };

  switch(type){
    case 'place':
      urlSegment = 'findplacefromtext';

      // deconstruct params and merge the type specific ones in
      params = { ...params, ...{
        input: query,
        inputtype: 'textquery',
        locationbias: 'circle:'+radius+'@'+region.latitude+','+region.longitude,
        fields: 'photos,formatted_address,name,rating,opening_hours,geometry'
      }};
      break;

    case 'search':
    default:
      urlSegment = 'textsearch';

      // deconstruct params and merge the type specific ones in
      params = { ...params, ...{
        query: query,
        location: region.latitude+','+region.longitude,
        radius: radius // TODO: add optional page param
      }};
  }


  const url = 'https://maps.googleapis.com/maps/api/place/'+urlSegment+'/json?'+stringify(params);

  return url;
};
