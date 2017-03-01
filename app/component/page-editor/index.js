'use strict'

require('./_page-editor.scss')

require('angular').module('slog')
.component('pageEditor', {
  template: require('./page-editor.html'),
  bindings: {
    page: '<',
    handleSubmit: '<',
  },
})
