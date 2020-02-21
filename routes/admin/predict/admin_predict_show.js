var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

//db set up
var mongoose = require('mongoose');
var Team_Data = require('../../../models/fantasy/team_db.js');
var Admin_Predict = require('../../../models/predictions/admin_predictions_db.js');
var User_Predict = require('../../../models/predictions/user_predictions_db.js');

//custom middle to prevent unauthorized visit
var middle = require('../../../middleware/admin_middleware');

//routing the ADMIN PREDICT SHOW
router.get('/admin/predict_show', middle.preventUnauthorizedVisit, (req, res, nex) => {
    User_Predict.find({}, (err, datas) => {
        if (err) {
            return next(err);
        } else {
            //get the team datas from the admin_predict db
            Admin_Predict.find({}, (err1, datas1) => {
                if (err1) {
                    return next(err1);
                } else {
                    //Get the payers name from the team database
                    //get team information from the data            
                    Team_Data.find({ $or: [{ 'name': datas1[0].team1_name }, { 'name': datas1[0].team2_name }] }, (err2, datas2) => {
                        if (err2) {
                            return next(err2)
                        } else {
                            var message = req.query.msg
                            var players = datas2[0].players.concat(datas2[1].players);

                            //Note: datas: all the user prediction data,
                            //Note: datas1: prediction information posted by the admin
                            //Note players: array of the  palyers name two teams in the game.  
                            return res.render('admin/predict/predict_show', { datas, datas1, players, message });
                        }
                    });
                }
            });

        }
    });

})

//Routing POST of predic show
router.post('/admin/predict_show', middle.preventUnauthorizedVisit, (req, res, next) => {
    var team = req.body.team;
    var player = req.body.player;

    User_Predict.find({ user_team: team }, (err1, docs1) => {
        if (err1) {
            return next(err1);
        } else {
            if (docs1 && docs1[0]) {
                if (docs1.length > 1) {
                    //This is case of many predictions
                    User_Predict.find({ user_player: player }, (err2, doc2) => {
                        if (err2) {
                            return next(err2)
                        } else {
                            console.log(doc2.length);
                            if (doc2 && doc2[0]) {
                                if (doc2.length > 1) {
                                    //many users have predicted correct player and team
                                    var length = doc2.length;
                                    var randomAns = Math.floor(Math.random() * length);
                                    var message = "Winner is " + doc2[randomAns].user_name;
                                    return res.redirect('/admin/predict_show?msg=' + message + ' (all Correct)');
                                } else {
                                    //only one user with the correct answer
                                    var message = "The winner is " + doc2[0].user_name;
                                    return res.redirect('/admin/predict_show?msg=' + message);
                                }
                            } else {
                                //All user have predicted the correct team but none have the players
                                //In this case select the the random user who have guessed the correct team
                                var length = docs1.length;
                                var randomAns = Math.floor(Math.random() * length);
                                var message = "Winner is " + docs1[randomAns].user_name;
                                return res.redirect('/admin/predict_show?msg=' + message + ' (correct Team)');
                            }
                        }
                    });
                } else {
                    //Onnly one winner
                    //Noone wins
                    var message = "The winner is " + docs1[0].user_name;
                    return res.redirect('/admin/predict_show?msg=' + message);
                }
            } else {
                //Noone wins
                //In this case select one random user of all submitted data

                //Finding all the users
                User_Predict.find({}, (err, allData) => {
                    if (err) {
                        return next(err);
                    } else {
                        var length = allData.length;
                        var randomAns = Math.floor(Math.random() * length);

                        var message = "No one matches the correct answer, so the winner is made to any one of the random user and its " + allData[randomAns].user_name;
                        return res.redirect('/admin/predict_show?msg=' + message);

                    }
                });
            }
        }
    });
});

module.exports = router;