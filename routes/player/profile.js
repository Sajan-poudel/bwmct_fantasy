var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PlayerData = require('../../models/fantasy/players_db');

router.get('/player_profile', (req, res, next) => {
    //Particular NEWS page
    //GET /news
    var name = req.query.name;
    console.log(name);
    if (!name) {
        return res.redirect('/leader_board');
    } else {
        PlayerData.findOne({ name }, function(err, docs) {
            if (err) {
                return next(err);
            } else {
                if (!docs) {
                    return res.redirect('/leader_board');
                } else {
                    return res.render('user/profile/player_profile', { title: 'BWMCT | Players', data: docs });
                }
            }
        });
    }
});



module.exports = router;