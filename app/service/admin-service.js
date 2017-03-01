'use strict';


require('angular').module('slog')
.service('authService', ['$log', '$q', '$window', '$http', authService])

function authService($log, $q, $window, $http){

  // private variable
  let authToken;

  // private function
  let tokenSave = (token) => {
    if(!token) 
      return $q.reject(new Error('no token'));
    try {
      $window.localStorage.token = JSON.stringify(token);
      authToken = token; 
      return $q.resolve(token);
    } catch (err) {
      return $q.reject(err);
    }
  }

  // public variables and functions
  let authService = {};
  authService.tokenFetch = () => {
    if(authToken)
      return $q.resolve(authToken);

    try {
      authToken = JSON.parse($window.localStorage.token);
      return $q.resolve(authToken);
    } catch(err) {
      return $q.reject(err);
    }
  }
  
  authService.login = (user) => {
    let url = `${__API_URL__}/api/login`;
    let encoded = $window.btoa(`${user.email}:${user.password}`);
    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${encoded}`,
      },
    };

    return $http.get(url, config)
    .then(res => {
      return tokenSave(res.data);
    })
  };

  return authService;
}
