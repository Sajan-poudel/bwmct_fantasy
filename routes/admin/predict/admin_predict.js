var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

//db set up
var mongoose = require('mongoose');
var Team_Data = require('../../../models/fantasy/team_db.js');
var Admin_Predict = require('../../../models/predictions/admin_predictions_db.js');
var User_Predict = require('../../../models/predictions/user_predictions_db.js');

//custom middle to prevent unauthorized visit
var middle = require('../../../middleware/admin_middleware')

router.get('/admin/predict', middle.preventUnauthorizedVisit, (req, res, next) => {
    Team_Data.find({})
        .exec(function(err, datas) {
            if (err) {
                return next(err);
            } else {
                return res.render('admin/predict/predict', { datas });
            }
        });
});

router.post('/admin/predict', middle.preventUnauthorizedVisit, (req, res, next) => {
    //delete data of the previous admin
    Admin_Predict.remove({}, (err) => {
        if (err) {
            return next(err);
        } else {
            //also delete the previous user data
            User_Predict.remove({}, (error) => {
                if (error) {
                    return next(error);
                } else {
                    //write the new data
                    var data = {
                        team1_name: req.body.team1,
                        team2_name: req.body.team2,
                        author_name: req.body.author,
                        game_name: req.body.title
                    }
                    Admin_Predict.create(data, (err, user) => {
                        if (err) {
                            return next(err);
                        } else {
                            console.log(user);
                            return res.redirect('/admin/predict');
                        }
                    });

                }
            });
        }
    });
});

module.exports = router;