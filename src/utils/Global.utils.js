import axios from 'axios'
import { isDev } from '@utils/Env.utils'

export const cdn = process.env.CDN

export const decodeJWT = (token) => {
  if (!token) {
    return null
  }
  
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const getCookie = (cname) => {
  var name = cname + '=';
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return false;
}

export function createCustomAPI(headers, path = '') {
  if (typeof window !== 'undefined') {
    const token = getCookie('X-Alfred-Token')
    const baseURL = isDev()
      ? process.env.APP_API_DEV + path
      : process.env.APP_API + path
      
  
    let instanceParams = {
      baseURL,
      headers: {
        ...headers,
        'Authorization': token
      }
    };
  
    const instance = axios.create(instanceParams);
  
    return instance;
  }
}

export function createAlfredAPI() {
  if (typeof window !== 'undefined') {
    const token = getCookie('X-Alfred-Token')
    const baseURL = `${process.env.ALFRED_API}/${process.env.APP_ID}`

    let instanceParams = {
      baseURL,
      headers: {
        'Authorization': token
      }
    };

    const instance = axios.create(instanceParams);

    return instance;
  }
}

export function nonce(length) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function withCommas(number) {
  return number.valueOf().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}