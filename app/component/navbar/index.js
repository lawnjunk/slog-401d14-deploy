'use strict';

require('angular').module('slog')
.component('navbar', {
  template: require('./navbar.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
  },
})
