import { FETCHES } from './constants';

export const URL = 'http://206.189.168.177:3000';

const myFetch = (path, method, headers, body, url = URL) =>
  fetch(`${url}${path}`, {
    method, headers:
      {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...headers
      },
    body: body ? JSON.stringify(body) : undefined
  });
const getQueryString = (params) => {
  const str = Object.keys(params)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
  return str ? `?${str}` : '';
};
const toArgs = (path, method, body = {}) => {
  switch (method) {
    case 'GET':
    case 'HEAD':
      return { path: `${path}${getQueryString(body)}`, method };
    default:
      return { path, method, body };
  }
};

const login = ({ username, password }) =>
  toArgs('/login', 'POST', { username, password });

const addVillain = ({ name, description, imageid, markerid }) =>
  toArgs('/villains', 'POST', { name, description, imageid, markerid });

const getVillain = ({ id }) =>
  toArgs(`/villains/${id}`, 'GET');

const getVillains = () =>
  toArgs('/villains', 'GET');

const removeVillain = ({ id }) =>
  toArgs(`/villains/${id}`, 'DELETE');

const updateVillain = ({ id, name, description, imageid }) =>
  toArgs(`/villains/${id}`, 'PUT', { name, description, imageid});

const addImage = ({ image }) =>
  toArgs('/images', 'POST', { imageBase64: image });

const getFunc = (fetchType) => {
  switch (fetchType) {
    case FETCHES.LOG_IN:
      return login;
    case FETCHES.GET_VILLAINS:
      return getVillains;
    case FETCHES.ADD_VILLAIN:
      return addVillain;
    case FETCHES.REMOVE_VILLAIN:
      return removeVillain;
    case FETCHES.UPDATE_VILLAIN:
      return updateVillain;
    case FETCHES.ADD_IMAGE:
      return addImage;
  }
  throw new Error('Fetch Type is not correct.');
};

function handleFetch(fetchType, data, token) {
  const { path, method, body } = getFunc(fetchType)(data);
  return myFetch(path, method, { 'X-Api-Token': token }, body);
}

function handleError({ errors, detail = '', error = '', status }) {
  let errorString = '';
  if (typeof errors !== 'undefined') {
    if (errors.length === 0) {
      errorString += 'Unknown error - length 0!';
    }
  }
  for (const err of [
    ...errors || [],
    { message: detail },
    { message: error }
  ]) {
    if (err.message) {
      errorString += (errorString ? '\n' : '') + err.message;
    }
  }
  if (errorString) {
    throw new Error(errorString);
  }
  if (console.debug(status) >= 400) {
    throw new Error(status);
  }
}

export async function fetchData(fetchType, data, token) {
  const rawResponse = await handleFetch(fetchType, data, token);
  // console.put('rawResponse', rawResponse);
  const response = await rawResponse.json();
  console.run(handleError,response);
  return response;
}