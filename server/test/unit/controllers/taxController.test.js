const assert = require('chai').assert
const sinon = require('sinon')
const taxController = require('../../../controllers/taxController')

describe('taxController', () => {
  describe('calculateTaxAmount', () => {
    it('should return 0 tax amount for income less or equal to 18200', () => {
      const income = 18200
      const tax = taxController.calculateTaxAmount(income)
      assert.equal(tax, 0)
    })

    it('should calculate tax amount for income less or equal to 37000', () => {
      const income = 37000
      const tax = taxController.calculateTaxAmount(income)
      assert.equal(tax, 3572)
    })

    it('should calculate tax amount for income less or equal to 87000', () => {
      const income = 87000
      const tax = taxController.calculateTaxAmount(income)
      assert.equal(tax, 19822)
    })

    it('should calculate tax amount for income less or equal to 180000', () => {
      const income = 180000
      const tax = taxController.calculateTaxAmount(income)
      assert.equal(tax, 54232)
    })

    it('should calculate tax amount for income over 180000', () => {
      const income = 320000
      const tax = taxController.calculateTaxAmount(income)
      assert.equal(tax, 117232)
    })

    it('should calculate tax amount for income between 87001 and 180000', () => {
      const income = 100000
      const tax = taxController.calculateTaxAmount(income)
      assert.equal(tax, 24632)
    })
  })

  describe('calculateSuperannuation', () => {
    it('should return superannuation amount of 100000 aud gross salary with default superannuation percentage 9.5%', () => {
      const income = 100000
      const superAnnuation = taxController.calculateSuperannuation(income)
      assert.equal(superAnnuation, 9500)
    })
    it('should return superannuation amount of 100000 aud gross salary with superannuation percentage passed as parameter (20%)', () => {
      const income = 100000
      const superAnnuation = taxController.calculateSuperannuation(income, 0.2)
      assert.equal(superAnnuation, 20000)
    })
  })

  describe('getPayDetails', () => {
    it('should return the gross amount if gross + superannuation has been entered', () => {
      const fullIncome = 109500
      const object = taxController.getPayDetails(0, fullIncome)
      assert.equal(object.gross, 100000)
    })
    it('should return the gross amount if gross + superannuation has been entered with a non-default superannuationRate', () => {
      const fullIncome = 120000
      const object = taxController.getPayDetails(0, fullIncome, 0.20)
      assert.equal(object.gross, 100000)
    })
    it('should return the gross + superannuation amount if ONLY gross has been entered', () => {
      const grossIncome = 100000
      const object = taxController.getPayDetails(grossIncome, 0)
      assert.equal(object.grossAndSuper, 109500)
    })
    it('should return the gross + superannuation amount if gross has been entered and superannuation is not the default one', () => {
      const grossIncome = 100000
      const superAnnuationRate = 0.2
      const object = taxController.getPayDetails(grossIncome, 0, superAnnuationRate)
      assert.equal(object.grossAndSuper, 120000)
    })
  })

  describe('taxCalculation', () => {
    it('should return tax details with income', async () => {
      const req = {
        user: {
          save: sinon.stub()
        },
        body: {
          income: 100000,
          fullIncome: 0
        }
      }
      const res = {
        json: sinon.spy()
      }
      req.user.save.resolves({})
      await taxController.taxCalculation(req, res)
      assert.deepEqual(res.json.getCall(0).args[0], {
        superAnnuation: 9500,
        gross: 100000,
        grossAndSuper: 109500,
        taxAmount: 24632,
        netAmount: 75368,
        netTotalAmount: 84868
      })
    })

    it('should return tax details with income and superAnnuationRate', async () => {
      const req = {
        user: {
          save: sinon.stub()
        },
        body: {
          income: 100000,
          fullIncome: 0,
          superAnnuationRate: 10
        }
      }
      req.user.save.resolves({})
      const res = {
        json: sinon.spy()
      }
      await taxController.taxCalculation(req, res)
      assert.deepEqual(res.json.getCall(0).args[0], {
        superAnnuation: 10000,
        gross: 100000,
        grossAndSuper: 110000,
        taxAmount: 24632,
        netAmount: 75368,
        netTotalAmount: 85368
      })
    })
  })
})
