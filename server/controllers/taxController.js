const taxRates = require('../mock/ratesTax-2016-2017')

const taxCalculation = (req, res) => {
  const { income, fullIncome, superAnnuationRate } = req.body
  let superRate = superAnnuationRate / 100 || 0.095
  let payDetails = getPayDetails(income, fullIncome, superRate)
  let superAnnuationAmount = calculateSuperannuation(payDetails.gross, superRate)
  let taxAmount = calculateTaxAmount(payDetails.gross)
  let netAmount = payDetails.gross - taxAmount
  const taxDetails = {
    gross: payDetails.gross,
    grossAndSuper: payDetails.grossAndSuper,
    netAmount: netAmount,
    netTotalAmount: netAmount + superAnnuationAmount,
    superAnnuation: superAnnuationAmount,
    taxAmount: taxAmount
  }
  req.user.taxes = req.user.taxes || []
  req.user.taxes.push(taxDetails)
  return req.user.save()
    .then(() => {
      res.json(taxDetails)
    }).catch((err) => {
      res.status(500).json(err)
    })
}

const calculateTaxAmount = (income) => {
  let tax = 0
  let lastMaxIncome = 0
  for (const maxIncome in taxRates) {
    const afterIncome = income - parseInt(maxIncome, 10)
    if (afterIncome >= 0) {
      tax += (maxIncome - lastMaxIncome) * taxRates[maxIncome]
      lastMaxIncome = maxIncome
    } else {
      tax += (income - lastMaxIncome) * taxRates[maxIncome]
      break
    }
  }
  return tax
}

const calculateSuperannuation = (income, superRate = 0.095) => {
  return income * superRate
}

const getPayDetails = (grossIncome, fullIncome, superAnnuationRate = 0.095) => {
  return {
    gross: grossIncome || fullIncome / (1 + superAnnuationRate),
    grossAndSuper: fullIncome || grossIncome + calculateSuperannuation(grossIncome, superAnnuationRate)
  }
}

module.exports = {
  taxCalculation,
  calculateTaxAmount,
  calculateSuperannuation,
  getPayDetails
}
