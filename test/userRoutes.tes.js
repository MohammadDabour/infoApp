const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');

const server = require('../index.js');

chai.use(chaiHttp);
const { expect } = chai;
const should = chai.should();

describe.skip('get home', () => {
  it('returns status code 200', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) {
          done(err);
        }
        res.should.have.status(200);
        expect(res.body).to.be.deep.equal({
          message: 'Start here'
        });
        done();
      });
  });
});

describe.skip('get users', () => {
  it('get all users', (done) => {
    chai.request(server)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        fs.expect.to.be.status(200);
        res.body.should.be.a('array');
        res.error.should.have.status(500);
        res.body.should.have.property('error');
        res.body.error.should.eql('Something Went Wrong');
        done();
      });
  });
});

// describe('added users', () => {
//   it('add new user', (done) => {
//     const user = {
//       id: '20',
//       usr_first_name: 'Test',
//       usr_last_name: 'User',
//       usr_pos: 'Mocha test',
//     };
//     chai.request(server)
//       .post('/users/')
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a('object');
//         user.should.have.property('id');
//         user.id.should.equal('20');
//         user.should.have.property('usr_first_name');
//         user.usr_first_name.should.equal('Test');
//         user.should.have.property('usr_last_name');
//         user.usr_last_name.should.equal('User');
//         user.should.have.property('usr_pos');
//         res.error.should.equal(false);
//         done();
//       });
//   });
// });
