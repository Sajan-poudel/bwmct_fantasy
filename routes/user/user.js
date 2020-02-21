var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

//var session = require('express-session');
var Admin_News = require('../../models/admin_news/admin_news_db.js');
var Admin_Gallery = require('../../models/admin_news/admin_gallery_db.js');
var UserData = require('../../models/fantasy/user_db');
var MatchInfo = require('../../models/fantasy/match_db');
var PlayerInfo = require('../../models/fantasy/players_db');

//HOME page
//GET /
router.get('/', (req, res, next) => {
    //Get latest 4 news
    Admin_News.find({})
        .sort({ 'post_date': -1 })
        .limit(3)
        .exec(function(err, news_datas) {
            if (err) {
                return next(err);
            } else {
                //Get 4 latest images from the database
                Admin_Gallery.find({})
                    .sort({ 'post_date': -1 })
                    .limit(4)
                    .exec(function(err, gallery_data) {
                        if (err) {
                            //display error
                            return next(err);
                        } else {
                            //displaying the dynamic news and gallery content
                            return res.render('user/home/home', { title: 'BWMCT | Home', news_datas, gallery_data });
                        }
                    });
            }
        });
});

//Particular NEWS page
//GET /news
router.get('/news', (req, res, next) => {
    var _id = req.query._id;

    if (!_id) {
        return res.redirect('/news_all');
    } else {
        Admin_News.find({ '_id': _id }, function(err, docs) {
            if (err) {
                return next(err);
            } else {
                if (!docs) {
                    return res.redirect('/news_all');
                } else {
                    //show separate news
                    return res.render('user/news/news', { title: 'BWMCT | News', datas: docs[0] });
                }
            }
        });
    }
});

//NEWS All page
//GET /news
router.get('/news_all', (req, res) => {

    Admin_News.find({})
        .sort({ 'post_date': -1 })
        .exec(function(err, datas) {
            if (err) {
                return next(err);
            } else {
                return res.render('user/news/news_all', { title: 'BWMCT | All News', datas });
            }
        });
});

//NEWS page
//GET /news
router.get('/gallery', (req, res) => {
    Admin_Gallery.find({})
        .sort({ 'post_date': -1 })
        .exec(function(err, datas) {
            if (err) {
                return next(err);
            } else {
                return res.render('user/gallerey/gallerey', { title: 'BWMCT | Gallery', datas });
            }
        });
});

//FIXTURES page
//GET /fixtures
router.get('/fixtures', (req, res) => {
    MatchInfo.find({}).sort({ position: 1 }).exec(function(err, data) {
        if (err) return next(err);
        let x = -1;
        for (let i = 0; i < 8; i++) {
            if (!data[i].completed) {
                if (x === -1) {
                    if (data[i].dateStart.toDateString() === (new Date()).toDateString() || data[i].dateStart < (new Date())) {
                        data[i].today = true;
                    } else {
                        data[i].today = false;
                    }
                    x = i;
                } else {
                    data[i].today = false;
                }
            }
        }
        return res.render('user/matchinf/fixtures', { data: data, x: x });
    });
});

//FIXTURES page
//GET /fixtures
router.get('/results', (req, res) => {
    MatchInfo.find({ completed: true }).sort({ position: -1 }).exec(function(err, data) {
        if (err) return next(err);
        return res.render('user/matchinf/results', { data: data });
    });
});

//GET /matchScores
//displays scores of all players of the match; url parameter- matchNo is needed
router.get('/matchScores', function(req, res, next) {
    let team1Players = [],
        team2Players = [];
    MatchInfo.findOne({ position: parseInt(req.query.matchNo) }, function(err, matchData) {
        if (err) return next(err);
        PlayerInfo.find({ teamName: 'Team ' + matchData.team1 }, function(err, players1) {
            players1.forEach(function(player) {
                let y = player.matchStats.find(key => key.GameName === parseInt(req.query.matchNo));
                if (y) {
                    y.name = player.name;
                    team1Players.push(y);
                }
            });
            PlayerInfo.find({ teamName: 'Team ' + matchData.team2 }, function(err, players2) {
                players2.forEach(function(player) {
                    let y = player.matchStats.find(key => key.GameName === parseInt(req.query.matchNo));
                    if (y) {
                        y.name = player.name;
                        team2Players.push(y);
                    }
                });
                console.log(team1Players);
                console.log(team2Players);
                return res.render('user/matchinf/matchScores', { arr: [team1Players, team2Players], m: matchData });
            });
        });
    });
});


//Routing the about page
//About
router.get('/about', (req, res, next) => {
    return res.render('user/home/about');
});


module.exports = router;