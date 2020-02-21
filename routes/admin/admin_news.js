var express = require('express');
var router = express.Router();

//db set up
var mongoose = require('mongoose');
var Admin_News = require('../../models/admin_news/admin_news_db.js');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/admin_middleware')

//including mutler to process the image
var multer = require('multer');
var upload = multer({ dest: 'uploads/news' })

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads/news");
    },
    filename: function(req, file, callback) {
        var newFileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, newFileName);
    }
});

var upload = multer({
    storage: Storage
}).single("file_image");


//Admin logIn
router.get('/admin/login', (req, res, next) => {
    res.render('admin/login');
});

//Create new post
//GET /create
router.get('/admin/create', middle.preventUnauthorizedVisit, (req, res) => {
    return res.render('admin/create');
});

//POST /create
router.post('/admin/create', middle.preventUnauthorizedVisit, (req, res, next) => {
    //udload the image
    upload(req, res, function(err) {
        if (err) {
            return next(err)
        } else {
            //Add data to the database
            var data = {
                post_name: req.body.title,
                post_author: req.body.author,
                post_date: Date.now(),
                post_news: req.body.news,
                post_image: req.file.filename
            };

            Admin_News.create(data, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    //Sucessfully created the user data
                    return res.redirect('/admin/create');
                }
            });
        }
    });

});

//Update the post
//GET /update
router.get('/admin/update', middle.preventUnauthorizedVisit, (req, res) => {

    Admin_News.find({})
        .sort({ 'post_date': -1 })
        .exec(function(err, datas) {
            if (err) {
                return next(err);
            } else {
                return res.render('admin/update', { datas });
            }
        });
});

// --Delete the news --
router.get('/admin/delete', middle.preventUnauthorizedVisit, (req, res, next) => {
    _id = req.query._id;
    if (!_id) {
        res.redirect('/create');
    } else {
        Admin_News.remove({ _id: _id }, function(err) {
            if (err) {
                res.redirect('/admin/create');
            } else {
                res.redirect('/admin/update');
            }
        });
    }
});


module.exports = router;