'use strict'

require('angular').module('slog')
.filter('navFilter', function(){
  return function(pages) {
    return pages.filter(p => p.showInNav)
  }
})
