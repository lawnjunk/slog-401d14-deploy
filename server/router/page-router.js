'use strict'

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Page = require('../model/page.js');
const bearerAuth = require('../lib/bearer-auth.js');

const pageRouter = module.exports = new Router();

// no auth necessary 
pageRouter.get('/api/page', (req, res, next) => {
  console.log(req.body)
  console.log(req.headers)
  Page.fetchAll()
  .then(pages => res.json(pages))
  .catch(next);
});

// routes with auth for CREATE/UPDATE and DESTROY
// used for creation and update
pageRouter.put('/api/page', bearerAuth, jsonParser, (req, res, next) => {
  new Page(req.body).save()
  .then(page => res.json(page))
  .catch(next);
});

pageRouter.delete('/api/page/:id', bearerAuth, (req, res, next) => {
  Page.findByIdAndDelete(req.params.id)
  .then(() => res.sendStatus(204))
  .catch(next);
});
