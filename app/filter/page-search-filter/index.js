'use strict'

require('angular').module('slog')
.filter('pageSearchFilter', function(){
  return function(pages, searchTerm){
    console.log('pages', pages)
    console.log('searchTerm', searchTerm)
    let fuzzyRegex = genorateFuzzyRegex(searchTerm)
    console.log('fuzzyRegex', fuzzyRegex)

    return pages.filter(page => {
      return fuzzyRegex.test(page.title.toLowerCase()) 
    })
  }
})

function genorateFuzzyRegex(term){
  if(!term) return /.*/;
  let fuzzy = term.toLowerCase().split('').join('.*');
  return new RegExp(`.*${fuzzy}.*`);
}
