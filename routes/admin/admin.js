var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');


router.get('/admin', (req, res, next) => {
    return res.render('admin/login');
});


//Authanticate the pass
router.post('/admin', (req, res, next) => {
    myPlaintextPassword = req.body.pass;
    var pass = '$2a$04$tnVchvtF/n6ziKcQIcUvC.e84.RgSedGvX23mkuMhzyLgF9SPItx6'; //vismoke
    var id = '$2a$04$Y/jd2.jjSGaZ5CEkSuLthey/7ZUbRBxXbEqiTngmJWoFVgCoUDche'; //dadda

    //check the id
    bcrypt.compare(req.body.id, id, function(err, result) {
        if (err) {
            return next(err);
        } else {
            if (!result) {
                res.redirect('/');
            } else {
                //id matchded check the password
                bcrypt.compare(req.body.pass, pass, function(err, result) {
                    if (err) {
                        return next(err);
                    } else {
                        if (!result) {
                            res.redirect('/')
                        } else {
                            //Sucessfully mathched
                            req.session.adminId = id;
                            res.redirect('/admin/create');
                        }
                    }
                });
            }
        }
    });
});

router.get('/admin/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;