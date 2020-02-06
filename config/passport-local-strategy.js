const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    function (req, email, password, done) {
    //find a user and establish an identity
    User.findOne({email: email}, function(err, user) {
        if (err) {
            req.flash('error', err)
            return done(err);
        }

        if (!user || user.password != password) {
            req.flash('error', 'Invalid username/password')
            return done(null, false);
        }

        return done(null, user);
    })
    }
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
    done(null, user.id)
});

// deserialing the user from key in the coookie
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user){
        if (err) {
            console.log('error in finding user ---> passport');
            return done(err);
        }
        return done(null, user);
    })
});

// check if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
    // if the user is signed in, then pass the req to the next function
    if (req.isAuthenticated()) {
        return next();
    };
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;