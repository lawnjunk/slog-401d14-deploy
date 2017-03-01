'use strict'

require('angular').module('slog')
.component('home', {
  template: require('./home.html'),
  controller: [ '$log', '$stateParams', '$location', 'pageService', HomeController],
});

function HomeController($log, $stateParams, $location, pageService){
  this.$onInit = () => {
    this.pages = [];
    this.selected = null;
    this.searchterm = ''

    this.navbarHandleSelect = (page) => {
      $location.path(`/home/${page.id}`);
      this.searchterm = ''
      console.log('hit navbarHandleSelect')
    }

    console.log('stateParams', $stateParams.id);

    pageService.fetchAll()
    .then(pages => {
      this.pages = pages;

      let pageID = $stateParams.id;
      if(!pageID)
        return this.selected = this.pages[0]
      if(pageID) {
        this.selected = pages.reduce((selected, current) => {
          if(current.id === pageID)
            return current;
          return selected;
        }, this.selected)
      }

    })
    .catch($log.error);
  };
}
