'use strict';

require('./lib/mock-env.js');

const {expect} = require('chai');
const superagent = require('superagent');
const Page = require('../model/page.js');
const serverControll = require('./lib/server-controll.js');
let baseURL = process.env.API_URL;

describe('testing page router', function(){
  before(serverControll.start)
  after(serverControll.stop)

  before(done => {
    superagent.get(`${baseURL}/api/login`)
    .auth('slugbyte@slugbyte.com', 'helloworld')
    .then(res => {
      this.tempToken = res.text;
      done();
    })
    .catch(done)
  })

  it('should create a note', (done) => {
    superagent.put(`${baseURL}/api/page`)
    .send({
      title: 'example page',
      content: '# hello\n* cool\n* beans',
      showInNav: true,
    })
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      this.tempPage = res.body;
      expect(res.status).to.equal(200);
      expect(!!res.body.id).to.equal(true);
      expect(res.body.title).to.equal('example page');
      expect(res.body.content).to.equal('# hello\n* cool\n* beans');
      expect(res.body.showInNav).to.equal(true);
      done();
    })
    .catch(done);
  })

  it('should respond with a 401', (done) => {
    superagent.put(`${baseURL}/api/page`)
    .send({
      title: 'example page',
      content: '# hello\n* cool\n* beans',
      showInNav: true,
    })
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(401);
      done();
    })
    .catch(done);
  })

  it('should respond with a 400', (done) => {
    superagent.put(`${baseURL}/api/page`)
    .send({ title: 'example page', showInNav: true })
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(400);
      done();
    })
    .catch(done);
  })

  it('should respond with 200 and array of pages', (done) => {
    superagent.get(`${baseURL}/api/page`)
    .then(res => {
      expect(res.status).to.equal(200);
      expect(Array.isArray(res.body)).to.equal(true);
      done();
    })
    .catch(done);
  });

  it('shuold update the page', (done) => {
    this.tempPage.title = 'lulwat';

    superagent.put(`${baseURL}/api/page`)
    .send(this.tempPage)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      this.tempPage = res.body;
      expect(res.status).to.equal(200);
      expect(!!res.body.id).to.equal(true);
      expect(res.body.title).to.equal('lulwat');
      expect(res.body.content).to.equal('# hello\n* cool\n* beans');
      expect(res.body.showInNav).to.equal(true);
      done();
    })
    .catch(done);

  })

  it('should respond with a 401 error', (done) => {
    superagent.delete(`${baseURL}/api/page/${this.tempPage.id}`)
    .then(done)
    .catch(res => {
      expect(res.status).to.equal(401);
      done();
    })
    .catch(done);
  })

  it('should delete the page', (done) => {
    superagent.delete(`${baseURL}/api/page/${this.tempPage.id}`)
    .set('Authorization', `Bearer ${this.tempToken}`)
    .then(res => {
      expect(res.status).to.equal(204);
      done();
    })
    .catch(done);
  })



});
