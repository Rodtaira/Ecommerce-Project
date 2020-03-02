const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const Product      =   require('../models/product')
const server    =   require('../app')

chai.use(chaiHttp)

describe('/GET products', function() {
    it('Must return all products available', function(done) {
        chai.request('http://localhost:8000/api')
        .get('/products?sortBy=sold&order=desc&limit=4')
        .end(function(error, res) {
            //Se tudo der certo deve retornar o status: 200 - OK
             res.should.have.status(200);
            //E em seguida retornar em um array todos os livros cadastrados na base de dados:
             //res.body.should.be.a('object');
            //res.body.length.should.be.eql(0);
        done();
        });
    });
});