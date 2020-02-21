var express = require('express');
var router = express.Router();

//db set up
var mongoose = require('mongoose');
var Admin_Gallery = require('../../models/admin_news/admin_gallery_db.js');

//custom middle to prevent unauthorized visit
var middle = require('../../middleware/admin_middleware');

var multer = require('multer');
var upload = multer({ dest: 'uploads/gall' })

var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads/gall");
    },
    filename: function(req, file, callback) {
        var newFileName = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, newFileName);
    }
});

var upload = multer({
    storage: Storage
}).single("file_image");




//Manage Gallery
//GET /gallery
router.get('/admin/gallery', middle.preventUnauthorizedVisit, (req, res, next) => {
    return res.render('admin/gallery');
});

//POST /gallery
router.post('/admin/gallery', middle.preventUnauthorizedVisit, (req, res, next) => {
    upload(req, res, function(err) {
        if (err) {
            return next(err)
        } else {
            //Add data to the database
            var data = {
                post_name: req.body.title,
                post_image: req.file.filename
            };

            Admin_Gallery.create(data, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    //Sucessfully created the user data
                    return res.redirect('/admin/gallery');
                }
            });
        }
    });
});

module.exports = router;