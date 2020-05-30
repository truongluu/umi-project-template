import { parseJwt } from './utils';

function setJwtToken(token) {
  if (token) {
    window.localStorage.setItem('token', token);
  } else {
    window.localStorage.removeItem('token');
  }
}

function getJwtToken() {
  const token = window.localStorage.getItem('token');

  if (!token) {
    return null;
  }

  if (parseJwt(token).exp < Date.now() / 1000) {
    setJwtToken(null);
    return null;
  }
  return token;
}

function setAuthority(auth) {
  if (auth) {
    window.localStorage.setItem('currentAuthority', auth);
  } else {
    window.localStorage.removeItem('currentAuthority');
  }
}

function getAuthority() {
  return window.localStorage.getItem('currentAuthority');
}

const storage = {
  getJwtToken,
  setJwtToken,
  setAuthority,
  getAuthority
};

export default storage;