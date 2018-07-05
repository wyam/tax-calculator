const express = require('express')
const router = express.Router()
const passport = require('passport')
const taxController = require('../controllers/taxController')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')

router.post('/auth/login', authController.login)
router.get('/user', passport.authenticate('jwt', {session: false}), userController.getCurrentUser)
router.post('/tax', passport.authenticate('jwt', {session: false}), taxController.taxCalculation)

module.exports = router
