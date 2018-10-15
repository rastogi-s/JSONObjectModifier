var should = require('chai').should(),
    expect = require('chai').expect,
    supertest = require('supertest'),
    api = supertest('http://localhost:5500');

describe('ObjectModifier', function () {

    var object1;
    before(function (done) {

        api.post('/api/objects')
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Shubham',
                'lastName': 'Rastogi'
            })
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end(function (err, res) {
                object1 = res.body;
                done();
            });
    });

    it('should return response : 200', function (done) {
        api.get('/api/objects')
            .set('Accept', 'application/json')
            .expect(200, done)
    });

    it('should return response : 200 and first name should be same', function (done) {
        api.get('/api/objects/' + object1.uid)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body.firstName).to.equal(object1.firstName);
                done();
            });

    });

});

describe('ObjectModifier2', function () {

    var object1;
    before(function (done) {

        api.post('/api/objects')
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Don',
                'lastName': 'Chase',
                'address': 'Mass Ave, Boston'
            })
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end(function (err, res) {
                object1 = res.body;
                done();
            });
    });

    it('should return response : 200 and first name should be changed from Don to Donald', function (done) {
        api.put('/api/objects/' + object1.uid)
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Donald',
                'lastName': 'Chase',
                'address': '15 B Mass Ave,Boston'
            })
            .expect(200)
            .end(function (err, res) {
                expect(res.body.firstName).to.equal('Donald');
                done();
            });

    });
});

describe('ObjectModifier3', function () {

    var object1;
    before(function (done) {

        api.post('/api/objects')
            .set('Accept', 'application/json')
            .send({
                'firstName': 'Jasmine',
                'lastName': 'Samuels',
                'address': 'Columbus Ave, Boston',
                'dob': '08-20-1992'
            })
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end(function (err, res) {
                object1 = res.body;
                console.log(4324);
                done();
            });
    });
    it('should return response : 200 and the last record in the array return should be jasmines record', function (done) {
        api.get('/api/objects')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                expect(res.body[res.body.length - 1].firstName).to.equal('Jasmine');
                done();
            });

    });
});


