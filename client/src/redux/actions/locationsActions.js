import axios from 'axios';
import { returnErrors } from './errorActions';
import { GET_ITEMS, ADD_ITEM, ITEMS_LOADING } from './types';
import { tokenConfig } from './authActions';

export const addItem = (item) => (dispatch, getState) => {
  axios
    .post('/api/locations/add', item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get('/api/locations/', tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
