const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID: "915699501486-l3q0hi4htdtsgcqfn48i2sv6svoh2ccn.apps.googleusercontent.com",
        clientSecret: "4ErZ5dRvnk_LVscmo_efPLVn",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    }, function (accessToken, refreshToken, profile, done) {
        User.findOne({email: profile.emails[0].value}).exec(function (err, user) {
            if (err) {console.log('error in passport-google strategy', err); return};

            console.log(profile);

            if (user) {
                return done(null, user);
            } else {
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    passport: crypto.randomBytes(20).toString('hex')
                },function (err, user) {
                    if (err) {console.log('error in passport-google strategy', err); return};
                    return done(null, user);
                    }
                )
            }

        })
    }
))

module.exports = passport;