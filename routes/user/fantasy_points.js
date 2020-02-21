var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');

var PlayerData = require('../../models/fantasy/players_db');
var UserData = require('../../models/fantasy/user_db');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/user_middleware');

router.get('/my_points', middle.preventUnauthorizedVisit, (req, res, next) => {
    UserData.findOne({ _id: req.session.userId }, (err, docs) => {
        if (err) {
            return next(err);
        } else {
            if (docs.user_players.length == 0) {
                //players data doesn't exist 
                return res.render('user/warning', { message: 'Goto pick up team to select players and come here back' });
            } else {
                //get the player array
                var pointInfo = docs.all_points;
                if (pointInfo.length > 0) {
                    return res.render('user/fantasy/user_points', { datas: pointInfo });
                } else {
                    return res.render('user/fantasy/user_points');
                }
            }
        }

    });

});

module.exports = router;