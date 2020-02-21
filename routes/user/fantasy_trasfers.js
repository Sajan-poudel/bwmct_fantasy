var express = require('express');
var router = express.Router();

//db connections
var mongoose = require('mongoose');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/user_middleware');

router.get('/transfers', middle.preventUnauthorizedVisit, (req, res, next) => {
    return res.render('user/warning', { message: 'Transfer Season will start when, all the group games are played' });
});

module.exports = router;