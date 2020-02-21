var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();

//mongo db connection
mongoose.connect("mongodb://localhost:27017/kct2k74");
var db = mongoose.connection;

//mongo error
db.on('error', console.error.bind(console, "Connection error"));

//using session
app.use(session({
    secret: 'one piece',
    resave: true,
}));

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('view engine', 'pug');

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// include routes
var admin_News_Routes = require('./routes/admin/admin_news');
var admin_Gallery_Routes = require('./routes/admin/admin_gallery');

var admin_Predict = require('./routes/admin/predict/admin_predict');
var admin_Predict_End = require('./routes/admin/predict/admin_predict_show');

var admin_Routes = require('./routes/admin/admin');

var adminAddPlayer = require('./routes/admin/players/addPlayer');
var adminPlayerUpdates = require('./routes/admin/players/addPlayerInfo');
var adminMatchInfo = require('./routes/admin/players/matchinfo');

var userRoutes = require('./routes/user/user');
var userPrediction = require('./routes/user/predict');
var userLogIN = require('./routes/user/login');

var fantasyPickUp = require('./routes/user/fantasy_pickup');
var fantasyTransfer = require('./routes/user/fantasy_trasfers');
var fantasyPoints = require('./routes/user/fantasy_points');
var fantasyUserRanks = require('./routes/user/user_ranking');

var playerProfile = require('./routes/player/profile');
var userTeam = require('./routes/user/user_team');
//admin routes

//Blogs get routes
app.use(admin_News_Routes);
app.use(admin_Gallery_Routes);

//Prediction routes
app.use(admin_Predict);
app.use(admin_Predict_End);

//Login Routes
app.use(admin_Routes);

//Admin palyer routes
app.use(adminAddPlayer);
app.use(adminPlayerUpdates);
app.use(adminMatchInfo);

//user routes
app.use(userRoutes);
app.use(userPrediction);
app.use(userLogIN);

//fantasy routes
app.use(fantasyPickUp);
app.use(fantasyTransfer);
app.use(fantasyPoints);
app.use(fantasyUserRanks);

//player routes
app.use(playerProfile);
app.use(userTeam);
//handle 404 error
//show the site not found message
app.get('*', (req, res, next) => {
    return res.render('user/error', { title: 'Error 404' });
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
    });
});

// listen on port 8888
app.listen(8888, function() {
    console.log('Express app listening on port 8888');
});