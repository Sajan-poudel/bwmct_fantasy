var express = require('express');
var router = express.Router();

//custom middle to prevent unauthorized visit
var middle = require('../../../middleware/admin_middleware');


var PlayersData = require('../../../models/fantasy/players_db');
var TeamData = require('../../../models/fantasy/team_db');

router.get('/admin/add_player', middle.preventUnauthorizedVisit, (req, res, next) => {
    return res.render('admin/fantasy/addPlayers');
});

router.post('/admin/add_player', middle.preventUnauthorizedVisit, (req, res, next) => {
    console.log(req.body);

    //add data to the palyer data base
    const teamName = req.body.teamName;
    const names = req.body.name;
    const prices = req.body.price;

    let newDatas = [];


    for (let i = 0; i < names.length; i++) {
        newDatas.push({ name: names[i], price: prices[i], teamName: teamName });
    }

    //Add to the players database
    PlayersData.insertMany(newDatas, (err) => {
        if (err) {
            console.log(err);
            return next(err);
        } else {

            //Add to the team database
            data = {
                name: teamName,
                players: names
            }
            TeamData.create(data, (err) => {
                if (err) {
                    return next(err);
                } else {
                    return res.end("Sucess fully added data to user and team db");
                }
            });
        }
    });

});

module.exports = router;