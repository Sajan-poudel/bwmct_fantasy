var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');

//var PlayerData = require('../../models/fantasy/players_db');
var UserData = require('../../models/fantasy/user_db');
var PlayerData = require('../../models/fantasy/players_db');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/user_middleware');

router.get('/my_rank', middle.preventUnauthorizedVisit, (req, res, next) => {
    UserData.find()
        .sort({ 'user_points': -1 })
        .limit(50)
        .exec((err, datas) => {
            if (err) {
                return next(err);
            } else {
                return res.render('user/fantasy/user_rank', { datas });
            }
        });
});

router.get('/leader_board', (req, res, next) => {
    PlayerData.find()
        .sort({ points: -1 })
        .limit(10)
        .exec((err, datas) => {
            if (err) {
                return next(err);
            } else {
                return res.render('user/fantasy/player_rank', { datas });
            }
        });
});

module.exports = router;