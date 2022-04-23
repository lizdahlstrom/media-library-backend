
// Integration tests

import { describe, it, before } from 'mocha'

import chai from 'chai'
import chaiHttp from 'chai-http'

import server from '../server'

import db from '../config/db'
import path from 'path'
import fs from 'fs'

chai.should()
chai.use(chaiHttp)

// create test db and test
before(async () => {
  const sql = fs.readFileSync(path.join(__dirname, '../../sql/create_test_db.sql')).toString()

  try {
    const hello = await db.query(sql)
    console.log(hello)
  } catch (error) {
    console.log('uh oh err', error)
  }
})

describe('Media items', () => {
  const mediaId = 1
  const testBody = {
    ID: mediaId,
    police_id: '12345',
    case_id: '54321',
    note: 'hello world'
  }
  // CREATE
  describe('POST /media', () => {
    it('Should add media post to db', (done) => {
      chai.request(server)
        .post('/media')
        .send(testBody)
        .end((err, res) => {
          if (err) done(err)
          res.should.have.status(201)
          res.body.should.be.a('object')
          console.log(process.env.NODE_ENV)
          done()
        })
    })
  })

  // GET
  describe('GET /media', () => {
    it('Should get all media items', (done) => {
      chai.request(server)
        .get('/media')
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })

  // GET by ID
  describe('GET /media/:id', () => {
    it('Should get a media item by id', (done) => {
      chai.request(server)
        .get('/media/' + mediaId)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          res.body.should.be.a('object')

          done()
        })
    })
  })

  describe('UPDATE /media/:id', () => {
    it('Should update item by id', (done) => {
      chai.request(server)
        .put('/media/' + mediaId)
        .send(testBody)
        .end((err, res) => {
          if (err) done(err)

          res.should.have.status(200)
          done()
        })
    })
  })

  // DELETE
  // describe('DELETE /media/:id', () => {
  //   it('Should delete an item by id', (done) => {
  //     chai.request(server)
  //       .delete('/media/' + 1)
  //       .end((err, res) => {
  //         if (err) done(err)

  //         res.should.have.status(200)
  //         done()
  //       })
  //   })
  // })
})
