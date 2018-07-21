import { ACTIONS, FETCHES } from './constants';

export const openAddVillainMenu = () => ({
  type: ACTIONS.OPEN_ADD_VILLAIN_MENU
});

export const closeAddVillainMenu = () => ({
  type: ACTIONS.CLOSE_ADD_VILLAIN_MENU
});

export const tryToLogin = ({ username, password }) => ({
  type: ACTIONS.FETCH_REQUEST,
  fetchType: FETCHES.LOG_IN,
  data: { username, password }
});

export const logout = () => ({
  type: ACTIONS.LOG_OUT
});

export const tryToGetVillains = () => ({
  type: ACTIONS.FETCH_REQUEST,
  fetchType: FETCHES.GET_VILLAINS
});

export const tryToAddVillain = ({ name, description, imageid }) => ({
  type: ACTIONS.FETCH_REQUEST,
  fetchType: FETCHES.ADD_VILLAIN,
  data: { name, description, imageid }
});

export const tryToRemoveVillain = ({ id }) => ({
  type: ACTIONS.FETCH_REQUEST,
  fetchType: FETCHES.REMOVE_VILLAIN,
  data: { id }
});

export const tryToUpdateVillain = ({ id, name, description, image }) => ({
  type: ACTIONS.FETCH_REQUEST,
  fetchType: FETCHES.UPDATE_VILLAIN,
  data: { id, name, description, image }
});

export const tryToUploadImage = ({ image }) => ({
  type: ACTIONS.FETCH_REQUEST,
  fetchType: FETCHES.ADD_IMAGE,
  data: { image }
});
