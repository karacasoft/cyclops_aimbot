import { FETCHES } from './constants';

const URL = '206.189.168.177:3000';

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
const toArgs = (path, method, body) => {
  switch (method) {
    case 'GET':
    case 'HEAD':
      return { path: `${path}${getQueryString(body)}`, method };
    default:
      return { path, method, body };
  }
};



const login = ({ user, password }) =>
  () => true;
//  toArgs('/', 'POST', { email: user, password });

const addVillain = ({ name, description, image }) =>
  toArgs('/villains', 'POST', { name, description, imageid: -2}); // todo change image

const getVillain = ({ id }) =>
  toArgs(`/villains${id}`, 'GET');

const getVillains = () =>
  toArgs('villains', 'GET');

const removeVillain = ({ id }) =>
  toArgs(`/villains${id}`, 'DELETE');

const updateVillain = ({ id, name, description, image }) =>
  toArgs(`/villains${id}`, 'PUT', { name, description, imageId: -3}); // todo change image

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
  }
  throw new Error('Fetch Type is not correct.');
};

function handleFetch(fetchType, data, token) {
  const { path, method, body } = getFunc(fetchType)(data);
  return myFetch(path, method, { 'X-API-TOKEN': token }, body);
}

function handleError({ errors, detail = '', error = '' }) {
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
}

export async function fetchData(fetchType, data, token) {
  const rawResponse = await handleFetch(fetchType, data, token);
  // console.put('rawResponse', rawResponse);
  const response = await rawResponse.json();
  handleError(response);
  return response;
}