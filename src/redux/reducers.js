import { combineReducers } from 'redux';
import { ACTIONS, FETCHES, PAGES } from './constants';

const loadStateGenerator = (fetchType) =>
  (state = { loaded: false, loading: false, error: '' }, action) => {
    if (action.type === ACTIONS.LOG_OUT) {
      return {
        loaded: false,
        loading: false,
        error: ''
      };
    }
    if (action.fetchType === fetchType) {
      switch (action.type) {
        case ACTIONS.FETCH_REQUEST:
          return {
            ...state,
            loading: true,
            error: ''
          };
        case ACTIONS.FETCH_SUCCESS:
          return {
            loaded: true,
            loading: false,
            error: ''
          };
        case ACTIONS.FETCH_ERROR:
          return {
            loaded: false,
            loading: false,
            error: action.error
          };
      }
    }
    return state;
  };

const page = (state = PAGES.LOG_IN, action) => {
  switch (action.type) {
    case ACTIONS.LOG_OUT:
      return PAGES.LOG_IN;
    case ACTIONS.OPEN_ADD_VILLAIN_MENU:
      return PAGES.ADD_VILLAIN;
    case ACTIONS.CLOSE_ADD_VILLAIN_MENU:
      return PAGES.VILLAINS;
  }
  return state;
};

const auth = (state = {}, action) => {
  if (action.type === ACTIONS.LOG_IN) {
    return {};
  }
  if (action.type === ACTIONS.FETCH_SUCCESS) {
    switch (action.fetchType) {
      case FETCHES.LOG_IN:
        return {
          token: action.data.token,
          user: action.oldData.user
        };
    }
  }
  return state;
};

const villainIds = (state = [], action) => {
  if (action.type === ACTIONS.LOG_OUT) {
    return [];
  }
  if (action.type === ACTIONS.FETCH_SUCCESS) {
    switch (action.fetchType) {
      case FETCHES.GET_VILLAINS:
        return action.data.map(({ id }) => id);
      case FETCHES.ADD_VILLAIN:
        return [...state, action.data];
      case FETCHES.REMOVE_VILLAIN:
        return state.filter((id) => id !== action.oldData.id);
    }
  }
  return state;
};

/*
  Villains are objects of type { name, description, image }
 */
const villainsById = (state = {}, action) => {
  if (action.type === ACTIONS.LOG_OUT) {
    return {};
  }
  if (action.type === ACTIONS.FETCH_SUCCESS) {
    switch (action.fetchType) {
      case FETCHES.GET_VILLAINS:
        return action.data.reduce((acc, villain) =>
          ({ ...acc, [villain.id]: villain }), {});
      case FETCHES.ADD_VILLAIN:
        return { ...state, [action.data.id]: action.data };
      case FETCHES.REMOVE_VILLAIN:
        return { ...state, [action.oldData.id]: undefined };
      case FETCHES.UPDATE_VILLAIN:
        return { ...state, [action.data.id]: action.data };
    }
  }
  return state;
};

export const rootReducer = combineReducers({
  page,
  auth,
  loginState: loadStateGenerator(FETCHES.LOG_IN),
  villainIds,
  villainsById,
  loadState: loadStateGenerator(FETCHES.GET_VILLAINS),
  addState: loadStateGenerator(FETCHES.ADD_VILLAIN),
  removeState: loadStateGenerator(FETCHES.REMOVE_VILLAIN),
  updateState: loadStateGenerator(FETCHES.UPDATE_VILLAIN)
});

export const getPage = (state) => state.page;

const getAuth = (state) => state.auth;
export const getToken = (state) => getAuth(state).token;
export const getUser = (state) => getAuth(state).user;
export const getLoginState = (state) => state.loginState;

export const getVillainIds = (state) => state.villainIds;
export const getVillainsById = (state) => state.villainsById;

export const getVillainsLoadState = (state) => state.loadState;
export const getVillainAddState = (state) => state.addState;
export const getVillainRemoveState = (state) => state.removeState;
export const getVillainUpdateState = (state) => state.updateState;

export const isLoaded = (state) => state.loaded;
export const isLoading = (state) => state.loading;
export const getError = (state) => state.error;
