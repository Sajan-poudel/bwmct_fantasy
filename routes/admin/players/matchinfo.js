var express = require('express');
var router = express.Router();

//custom middle to prevent unauthorized visit
var middle = require('../../../middleware/admin_middleware');

var MatchInfo = require('../../../models/fantasy/match_db');

//initialize match info
router.get('/admin/initializeMatchInfo', middle.preventUnauthorizedVisit, (req, res, next) => {
    MatchInfo.remove({}, function(err) {//clears all documents
        if (err) console.error(err);
        for(var i=1; i<10; i++){
            var match=new MatchInfo({
                position : i,
                team1 : '11',
                team2 : '12A',
                dateStart : (i<3)?new Date('September 13, 2017 12:23:00'):((i===3)?new Date(): new Date('November 13, 2017 15:43:00')),
                type : 'General Match',
                completed : i<3
                
            });
            match.save(function (err) {
                if (err) return next(err);         
            });
        }
        return res.json('{successful : true}');
	});    
});

//get //updateMatchInfo
//form for updating matchInfo database
router.get('/admin/updateMatchInfo', function(req, res, next){
    return res.render('admin/fantasy/updateMatchInfo');
});

router.post('/admin/updateMatchInfo', function(req, res, next){
    MatchInfo.findOne({position : parseInt(req.body.match)}, function(err, doc){
		if(err) return next(err);
		if(!doc){
			err = new Error('not found');
			err.status=404;
			return next(err);
        }
        doc.update(req.body, function(err,result){
            if(err) next(err);
            res.json(result);
        });
    });
});

module.exports=router;