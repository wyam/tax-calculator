const assert = require('chai').assert
const request = require('supertest')
const UserModel = require('./../../model/UserModel')
const jwt = require('jsonwebtoken')
const app = require('../../app')

describe('Tax calculation Test', () => {
  beforeEach(async () => {
    await UserModel.find({}).remove()
  })

  it('should return tax details when post with income', async () => {
    await UserModel.create({email: 'test@email.com'})
    const token = jwt.sign({email: 'test@email.com'}, 'jwt_secret')
    return request(app)
      .post('/tax')
      .set('Authorization', `Bearer ${token}`)
      .send({income: 100000})
      .then((res) => {
        assert.deepEqual(res.body, {
          superAnnuation: 9500,
          gross: 100000,
          grossAndSuper: 109500,
          taxAmount: 24632,
          netAmount: 75368,
          netTotalAmount: 84868
        })
        return UserModel.findOne({email: 'test@email.com'})
      })
      .then((user) => {
        assert.deepEqual(user.taxes, [{
          superAnnuation: 9500,
          gross: 100000,
          grossAndSuper: 109500,
          taxAmount: 24632,
          netAmount: 75368,
          netTotalAmount: 84868
        }])
      })
  })
})
