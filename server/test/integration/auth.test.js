const assert = require('chai').assert
const request = require('supertest')
const UserModel = require('./../../model/UserModel')
const jwt = require('jsonwebtoken')
const app = require('../../app')

describe('Authentication Test', () => {
  beforeEach(async () => {
    await UserModel.find({}).remove()
  })

  it('should return an error when no given any token', () => {
    return request(app)
      .get('/user')
      .expect(401)
      .then((res) => {
        // console.log(res.statusCode)
        assert.deepEqual(res.text, 'Unauthorized')
      })
  })

  it('should return current user', async () => {
    await UserModel.create({
      email: 'test@email.com',
      taxes: [{
        superAnnuation: 9500,
        gross: 100000,
        grossAndSuper: 109500,
        taxAmount: 24632,
        netAmount: 75368,
        netTotalAmount: 84868
      }]
    })
    const token = jwt.sign({email: 'test@email.com'}, 'jwt_secret')
    return request(app)
      .get('/user')
      .set('Authorization', `Bearer ${token}`)
      .then((res) => {
        assert.deepEqual(res.body.email, 'test@email.com')
        assert.deepEqual(res.body.taxes, [{
          superAnnuation: 9500,
          gross: 100000,
          grossAndSuper: 109500,
          taxAmount: 24632,
          netAmount: 75368,
          netTotalAmount: 84868
        }])
      })
  })

  it('should return a token if user was found', async () => {
    const tokenExpected = jwt.sign({email: 'test@email.com'}, 'jwt_secret')
    await UserModel.create({email: 'test@email.com'})
    return request(app)
      .post('/auth/login')
      .send({ email: 'test@email.com', password: 'password' })
      .then((res) => {
        assert.deepEqual(res.body.token, tokenExpected)
      })
  })
})
