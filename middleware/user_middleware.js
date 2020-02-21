function preventUnauthorizedVisit(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        return res.redirect('/');
    }
}

function inverseUserAuthentication(req, res, next) {
    if (req.session && req.session.userId) {
        return res.redirect('/');
    } else {
        return next();
    }
}

module.exports.preventUnauthorizedVisit = preventUnauthorizedVisit;
module.exports.inverseUserAuthentication = inverseUserAuthentication;