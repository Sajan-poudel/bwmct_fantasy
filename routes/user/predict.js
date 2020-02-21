var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');

var Team_Data = require('../../models/fantasy/team_db.js');
var Admin_Predict = require('../../models/predictions/admin_predictions_db.js');
var User_Predict = require('../../models/predictions/user_predictions_db.js');
var User_Data = require('../../models/fantasy/user_db');

//Custom middleware
//custom middle to prevent unauthorized visit
var middle = require('../../middleware/user_middleware');

router.get('/predict', middle.preventUnauthorizedVisit, (req, res, next) => {
    Admin_Predict.find({}, (err, datas) => {
        if (err) {
            return next(err);
        } else {
            //get team information from the data
            Team_Data.find({ $or: [{ 'name': datas[0].team1_name }, { 'name': datas[0].team2_name }] }, (err, docs) => {
                if (err) {
                    return next(err)
                } else {
                    var message = req.query.dup
                    var players = docs[0].players.concat(docs[1].players);
                    return res.render('user/predict/predict', { title: 'BWMCT | Predict', datas: datas, players, message });
                }
            });
        }
    });
});


//POST:- The predict submission
router.post('/predict', middle.preventUnauthorizedVisit, (req, res, next) => {
    var userId = req.session.userId;

    //Avoid the duplicate form submission, for that check in user_predictions_db on that page 
    User_Predict.findOne({ user_id: userId }, (err, docs) => {
        if (err) {
            return next(err);
        } else {
            if (docs) {
                //The user has already submitted the predictions
                return res.redirect('/predict?dup=true');
            } else {
                //The user have not made predictions

                //Find that from the session.ID to get user name 
                User_Data.findOne({ _id: userId }, (err, docs) => {
                    if (err) {
                        return next(err);
                    } else {
                        if (!userId) {
                            res.redirect('/');
                        } else {

                            // Collecting the data that is to be sored
                            var data = {
                                user_name: docs.user_name,
                                user_id: userId,
                                user_secret: req.body.secret,
                                user_team: req.body.team,
                                user_player: req.body.player
                            }

                            //Storing the data to the db
                            User_Predict.create(data, (err, user) => {
                                if (err) {
                                    return next(err);
                                } else {
                                    //Data sucessfully stored
                                    res.end('Data sucess fully added');
                                }
                            });

                        }
                    }
                });

            }
        }
    });
});

module.exports = router