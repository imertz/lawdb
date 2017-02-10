import passport from 'passport'
import ppjwt from 'passport-jwt'

import {User} from '../models/user'
import {config} from './main'
import pplocal from 'passport-local'
const localOptions = { usernameField: 'email' };


const localLogin = new pplocal.Strategy(localOptions, function(email, password, done) {  
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { message: 'Your login details could not be verified. Please try again.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { message: "Your login details could not be verified. Please try again." }); }

      return done(null, user);
    });
  });
});
const jwtOptions = {  
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ppjwt.ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};
const jwtLogin = new ppjwt.Strategy(jwtOptions, function(payload, done) {  
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});



export {localLogin, jwtLogin}  