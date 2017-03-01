'use strict';


require('./scss/main.scss')

const angular = require('angular');

// 3rd party angular modules
const ngMarked = require('angular-marked');
const uiRouter = require('angular-ui-router');
const ngClipboard = require('angular-clipboard');
const ngAnimate = require('angular-animate')
const ngTouch = require('angular-touch');

angular.module('slog', [uiRouter, ngMarked, ngClipboard.name, 'ngTouch', 'ngAnimate'])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.when('', '/home');

  let routes = [
    {
      name: 'home',
      url: '/home',
      template: '<home> </home>',
    },
    {
      name: 'homepage',
      url: '/home/:id',
      template: '<home> </home>',
    },
    {
      name: 'layout', 
      url: '/layout',
      template: '<layout> </layout>',
    },
    {
      name: 'admin',
      url: '/admin',
      template: '<admin> </admin>',
    },
    {
      name: 'dashboard',
      url: '/dashboard',
      template: '<dashboard> </dashboard>',
    }
  ];

  routes.forEach(route => $stateProvider.state(route));
}]);

// load services
require('./service/admin-service.js');
require('./service/page-service.js');

// load filters
require('./filter/nav-filter');
require('./filter/page-search-filter');

//load containers
require('./container/admin');
require('./container/dashboard');
require('./container/home');

//load components
require('./component/login');
require('./component/layout');
require('./component/page-editor');
require('./component/page-select');
require('./component/page-searchbar')
require('./component/navbar');

