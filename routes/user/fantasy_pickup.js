var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');

var PlayerData = require('../../models/fantasy/players_db');
var UserData = require('../../models/fantasy/user_db');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/user_middleware');

router.get('/pick_up', middle.preventUnauthorizedVisit, (req, res, next) => {

    UserData.findOne({ _id: req.session.userId }, (err, docs) => {
        if (err) {
            return next(err);
        } else {
            if (docs.user_players.length > 0) {
                //alredy exist
                return res.render('user/warning', { message: 'You have already picked up your, go to my team page' });
            }
        }
    });

    PlayerData.find({}, (err, docs) => {
        if (err) {
            return next(err);
        } else {

            //declatring the teams variables
            let Team8 = [];
            let Team9 = [];
            let Team10 = [];
            let Team11 = [];
            let Team12A = [];
            let Team12B = [];

            for (let i = 0; i < docs.length; i++) {
                if (docs[i].teamName === "Team 8") {
                    Team8.push(docs[i]);
                } else if (docs[i].teamName === "Team 9") {
                    Team9.push(docs[i]);
                } else if (docs[i].teamName === "Team 10") {
                    Team10.push(docs[i]);
                } else if (docs[i].teamName === "Team 11") {
                    Team11.push(docs[i]);
                } else if (docs[i].teamName === "Team 12A") {
                    Team12A.push(docs[i]);
                } else if (docs[i].teamName === "Team 12B") {
                    Team12B.push(docs[i]);
                }
            }
            return res.render('user/fantasy/pick_up', { Team8, Team9, Team10, Team11, Team12A, Team12B });
        }
    });

});

router.post('/pick_up', middle.preventUnauthorizedVisit, (req, res, next) => {
    var playerList = [];

    for (keys in req.body) {
        playerList.push(req.body[keys]);
    }

    var conditions = { _id: req.session.userId },
        update = { $push: { user_players: { $each: playerList } } },
        options = { multi: false };

    UserData.update(conditions, update, options, (err, numAffected) => {
        if (err) {
            return next(err);
        } else {
            //sucess
            console.log(numAffected);
            return res.redirect('/my_team');
        }
    });

});

module.exports = router;