var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');

var PlayerData = require('../../models/fantasy/players_db');
var UserData = require('../../models/fantasy/user_db');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/user_middleware');

router.get('/my_team', middle.preventUnauthorizedVisit, (req, res, next) => {
    UserData.findOne({ _id: req.session.userId }, (err, docs) => {
        if (err) {
            return next(err);
        } else {
            if (docs.user_players.length == 0) {
                //players data doesn't exist 
                return res.render('user/warning', { message: 'Goto pick up team to select players and come here back' });
            } else {
                //get the player array
                var players = docs.user_players;

                PlayerData.find({
                    $or: [
                        { name: players[0] },
                        { name: players[1] },
                        { name: players[2] },
                        { name: players[3] },
                        { name: players[4] },
                        { name: players[5] },
                        { name: players[6] },
                        { name: players[7] },
                        { name: players[8] },
                        { name: players[9] },
                        { name: players[10] }
                    ]
                }, (err, datas) => {
                    if (err) {
                        return next(err);
                    } else {
                        console.log("It was called");
                        console.log(datas);
                        return res.render('user/fantasy/team_info', { datas });
                    }
                });
                //then get the player info
            }
        }

    });

});

module.exports = router;