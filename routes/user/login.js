/**
 * This router handle following routes:
 * 
 * 1)Log IN
 * 2)Register
 * 3)Log Out
 */

var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');
var UserData = require('../../models/fantasy/user_db');

//including the custom middle ware
var middle = require('../../middleware/user_middleware');

//Router the register
router.get('/register', middle.inverseUserAuthentication, (req, res, next) => {
    return res.render('user/forms/register');
});

//Router the register
router.post('/register', middle.inverseUserAuthentication, (req, res, next) => {
    if (req.body.pass1 != req.body.pass2) {
        //throw error the pass word didnot matched
        var errMsg = "The two password provided did no matched";
        return res.render('user/forms/register', { message: errMsg });
    } else {
        //add data to the data base
        var data = {
            user_name: req.body.name,
            user_id: req.body.id,
            user_pass: req.body.pass1,
            user_msg: req.body.msg,
            user_points: 0
        };

        //check if the id already exists
        UserData.findOne({ user_id: req.body.id }, (err, person) => {
            if (err) {
                return next(err);
            } else {
                if (person) {
                    //there is already id exist
                    return res.render('user/forms/register', { message: 'The ID already exist pick another' });
                } else {
                    //you can write the data, there is no id duplication
                    UserData.create(data, (err, user) => {
                        if (err) {
                            return next(err);
                        } else {
                            //redirect to the login
                            return res.redirect('/login');
                        }
                    });
                }
            }
        });

    }
});

//Router the logins
router.get('/login', middle.inverseUserAuthentication, (req, res, next) => {
    return res.render('user/forms/login');
});

//Router the logins
router.post('/login', middle.inverseUserAuthentication, (req, res, next) => {
    //authenticate the user
    UserData.authenticate(req.body.id, req.body.pass, function(err, user) {
        if (err) {
            return res.render('user/forms/login', { message: err.message });
        } else if (!user) {
            message = 'Password did not matched';
            return res.render('user/forms/login', { message: "Password did not matched" });
        } else {
            req.session.userId = user._id;
            return res.redirect('/pick_up');
        }
    });
});

//Router the Log outs
router.get('/logout', (req, res, next) => {
    req.session.destroy();
    return res.redirect('/');
});

module.exports = router