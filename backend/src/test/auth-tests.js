const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const User      =   require('../models/user')
const server    =   require('../app')

chai.use(chaiHttp)

describe('Sign Up new User', () => {
    
    let user = { 
        "name": "Rodrigo",
        "email": "rodtaira@gmail.com",
        "password": "baba123", 
    }

    it('It should register a new user', (done) => {
        chai.request('http://localhost:8000/api')
            .post('/signup')
            .send(user)
            .end((err, res) => {
                // res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.book.should.have.property('name');
                res.body.book.should.have.property('email');
                res.body.book.should.have.property('password');
            done();
          });
    })
})