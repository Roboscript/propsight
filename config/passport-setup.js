var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var keys = require('./keys');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var flash = require('connect-flash');



    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email already taken'));
                    }
                     else {
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = newUser.generateHash(password);
                         newUser.username = req.body.username;
                         newUser.country = req.body.country;
                         newUser.cell = req.body.cell;
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    } 
                });

            });
        }));

         passport.use('local-asignup', new LocalStrategy({
                 usernameField: 'email',
                 passwordField: 'password',
                 passReqToCallback: true
             },
             function (req, email, password, done) {
                 process.nextTick(function () {
                     User.findOne({
                         'email': email
                     }, function (err, user) {
                         if (err)
                             return done(err);
                         if (user) {
                             return done(null, false, req.flash('signupMessage', 'That email already taken'));
                         } else {
                             var newUser = new User();
                             newUser.email = email;
                             newUser.password = newUser.generateHash(password);
                             newUser.username = req.body.username;
                             newUser.department = req.body.department;
                             newUser.title = req.body.title;
                             newUser.admin = true;
                             newUser.cell = req.body.cell;
                             newUser.save(function (err) {
                                 if (err)
                                     throw err;
                                 return done(null, newUser);
                             });
                         }
                     });

                 });
             }));

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            process.nextTick(function () {
                User.findOne({ 'email': email }, function (err, user) {
                    if (err)
                        return done(err);
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No User found'));
                    if (!user.validPassword(password)) {
                        return done(null, false, req.flash('loginMessage', 'Invalid credentials'));
                    }
                    return done(null, user);

                });
            });
        }
    ));


    passport.use(new FacebookStrategy({
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret,
        callbackURL: '/users/facebook/redirect',
        passReqToCallback: true
    },
        function (req, accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
                //user is not logged in yet
                if (!req.user) {
                    User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);
                        if (user)
                            return done(null, user);
                        else {
                            var newUser = new User();
                            newUser.facebook.id = profile.id;
                            newUser.facebook.token = accessToken;
                            newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.facebook.email = profile.emails[0].value;

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });
                }

                //user is logged in already, and needs to be merged
                else {
                    var user = req.user;
                    user.facebook.id = profile.id;
                    user.facebook.token = accessToken;
                    user.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.facebook.email = profile.emails[0].value;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

            });
        }

    ));

    passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/users/google/redirect',
        passReqToCallback: true
    },
        function (req, accessToken, refreshToken, profile, done) {
            process.nextTick(function () {

                if (!req.user) {
                    User.findOne({ 'google.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);
                        if (user)
                            return done(null, user);
                        else {
                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = accessToken;
                            newUser.google.name = profile.displayName;
                            newUser.google.email = profile.emails[0].value;

                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    var user = req.user;
                    user.google.id = profile.id;
                    user.google.token = accessToken;
                    user.google.name = profile.displayName;
                    user.google.email = profile.emails[0].value;

                    user.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, user);
                    });
                }

            });
        }

    ));





