function preventUnauthorizedVisit(req, res, next) {
    if (req.session && req.session.adminId) {
        if (req.session.adminId === '$2a$04$Y/jd2.jjSGaZ5CEkSuLthey/7ZUbRBxXbEqiTngmJWoFVgCoUDche') {
            return next();
        } else {
            return res.redirect('/');
        }

    } else {
        return res.redirect('/');
    }
}

module.exports.preventUnauthorizedVisit = preventUnauthorizedVisit;