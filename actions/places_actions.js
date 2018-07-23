import axios from 'axios';
import { dispatch } from 'react-redux';
import  reverseGeocode from 'latlng-to-zip';
import { stringify } from 'qs';

import {
  FETCH_PLACES
} from './types';

export const fetchJobs = (region, query, callback) => async (dispatch) => {
  try{
    // data is contained in response.data so deconstruct
    let { data } = await axios.get(buildPlacesURL(region, query));
    dispatch({ type: FETCH_PLACES, payload: data });
    callback();
  }catch(e){
    console.log(e);
  }
};

const buildPlacesURL = (region, query, raduis) => {
  if(!radius){
    radius = 2000;
  }

  const qs = stringify({
    key: googleApiKey,
    input: query,
    inputtype: 'textquery',
    locationbias: 'circle:'+radius+'@'+region.lat+','+region.lng,
    fields: 'photos,formatted_address,name,rating,opening_hours,geometry'
  });

  return 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?'+qs;
};
