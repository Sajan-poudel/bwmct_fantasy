var express = require('express');
var router = express.Router();

//custom middle to prevent unauthorized visit
var middle = require('../../../middleware/admin_middleware');


var PlayersData = require('../../../models/fantasy/players_db');
var TeamData = require('../../../models/fantasy/team_db');
var UserData = require('../../../models/fantasy/user_db');

router.get('/admin/addPoints', (req, res, next) => {
    var temName = req.query.team;
    console.log(temName);
    //Handle the wrong request
    if (temName == '8' || temName == '9' || temName == '10' || temName == '11' || temName == '12A' || temName == '12B') {
        var teamName = "Team " + temName;
        TeamData.findOne({ name: teamName }, (err, docs) => {
            if (err) {
                return next(err);
            } else {
                var players = docs.players
                console.log(players);
                return res.render('admin/fantasy/addPoints', { players });
            }
        });
    } else {
        var error = new Error("Bad request");
        error.status = 402;
        return next(error);
    }
});

router.post('/admin/addPoints', (req, res, next) => {
    let fantacyData=[]//array of objects to be stored in all_points field of user database
    let promises=[];
    for(let i = 0 ; i<18 ; i++){
        if(!req.body[i+'']) break;
        if(req.body[i+''][1]==='0') continue;
        promises.push(new Promise(function(resolve , response){
            console.log(req.body[i+'']);
            let updateData = req.body[i+''];
            let plrName = updateData[0];
            //total points
            // 0 Runs +1points
            // 1 Wickets +10 
            // 2 Catches +10
            // 3 Run Outs +10
            // 4 Made In +5
            // 5 Dog Out -10    
            let x=parseInt(updateData[2]) + parseInt(updateData[3]) * 10 + parseInt(updateData[4]) * 10 + parseInt(updateData[5]) * 10 + parseInt(updateData[6]) * 8 - parseInt(updateData[7]) * 10;        
            let dataToStore = {
                GameName: parseInt(updateData[1]),
                Runs: parseInt(updateData[2]),
                Wickets: parseInt(updateData[3]),
                Catches: parseInt(updateData[4]),
                RunOuts: parseInt(updateData[5]),
                MadeIns: parseInt(updateData[6]),
                DogOuts: parseInt(updateData[7]),
                Balls: parseInt(updateData[8]),
                StrikeRate: parseInt(updateData[2])/parseInt(updateData[8])*100,  
                Points: x }
            fantacyData.push({plrName : plrName, match : parseInt(updateData[1]), points : x});
            //Find the player of that name In The Db and Push all Infos
            let conditions = { name: plrName },
            update = {$push: { allPoints: x ,  matchStats: dataToStore}, $inc: { points: x } },
            options = { multi: false };

            PlayersData.update(conditions, update, options, (err, numAffected) => {
                if (err) return next(err);
                resolve();
            });
        }));
    }
    Promise.all(promises)
    .then(function() { 
        UserData.find({}, function(err, users){
            if(err) return next(err);
            let toDos=users.map(function(user){
                return new Promise(function(resolve, reject){
                    let updated=false;
                    fantacyData.forEach(function(plrData){
                        if(user.user_players.indexOf(plrData.plrName)!==-1){
                            user.all_points.push(plrData);
                            if(!user.user_points){user.user_points=plrData.points;}else{user.user_points+=plrData.points;}
                            updated=true;
                        }
                    });
                    if(updated){
                        user.save(function(err){if(err) return next(err);console.log('data saved');resolve();});
                    }else{
                        resolve();
                    }
                });

            });
            Promise.all(toDos)
            .then(function(){res.json({successful : true});})
            .catch(function(error) { return next(error); });
        });
        
    })
    .catch(function(error) { return next(error); });
    
});


module.exports = router;