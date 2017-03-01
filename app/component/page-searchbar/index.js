'use strict'

require('./_page-searchbar.scss');

require('angular').module('slog')
.component('pageSearchbar', {
  template: require('./page-searchbar.html'),
  bindings: {
    pages: '<',
    handleSelect: '<',
    searchterm: '=',
  }
})
