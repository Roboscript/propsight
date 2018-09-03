const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const keys = require('../config/keys');
const User = require('../models/user');
const Property = require('../models/property');
const Surbub = require('../models/surbub');

// Get Homepage
router.get('/', function (req, res) {
    Property.find({}, function (err, users) {
                if (err) {
                    console.log(err);
                } else {
                    const sdata = [];
                    for (i = 0; i < users.length; i++) {
                        sdata.push(users[i].suburb_name);
                    }
                    res.render('index', {
                        sdata: sdata
                    });
                }
            });
        });

// Get Homepage
router.get('/index', function (req, res) {
    Property.find({}, function (err, users) {
                if (err) {
                    console.log(err);
                } else {
                    const sdata = [];
                    for (i = 0; i < users.length; i++) {
                        sdata.push(users[i].suburb_name);
                        
                    }
                    res.render('index', {
                        sdata: sdata
                    });
                }
            });
        });
// Get Contact
router.get('/contact', function (req, res) {
    res.render('contact');
});

//Get fAQ
router.get('/faq', function (req, res) {
    res.render('faq');
});

module.exports = router;