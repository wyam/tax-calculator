const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const UserModel = require('./model/UserModel')

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, cb) => {
    return UserModel.findOne({ email })
      .then(user => {
        if (!user) {
          return cb(null, false, {message: 'Incorrect email or password.'})
        }
        return cb(null, user, {message: 'Logged In Successfully'})
      })
      .catch(err => cb(err))
  }
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt_secret'
},
(jwtPayload, cb) => {
  return UserModel.findOne({email: jwtPayload.email})
    .then(user => {
      console.log(user)
      return cb(null, user)
    })
    .catch(err => {
      return cb(err)
    })
}
))
