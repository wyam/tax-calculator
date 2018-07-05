const jwt = require('jsonwebtoken')
const passport = require('passport')

const login = (req, res) => {
  console.log(req.body)
  passport.authenticate('local', {session: false}, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ message: 'Something is not right' })
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.status(500).json(err)
      }
      const token = jwt.sign({ email: user.email }, 'jwt_secret')
      return res.json({token})
    })
  })(req, res)
}

module.exports = { login }
