var mongoose = require('mongoose');
var bcrypt = require('bcrypt');


var UserDataSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: true,
        trim: true
    },

    user_id: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    user_pass: {
        type: String,
        required: true
    },

    user_msg: {
        type: String,
        required: true
    },

    user_players: {
        type: []
    },

    user_points: {
        type: Number
    },

    all_points: {
        type: []
    }

});

//Authenticale input against database documents
UserDataSchema.statics.authenticate = function(id, password, callback) {
    UserData.findOne({ user_id: id })
        .exec(function(error, user) {
            if (error) {
                return callback(error);
            } else if (user) {
                bcrypt.compare(password, user.user_pass, function(error, result) {
                    if (result === true) {
                        return callback(null, user);
                    } else {
                        return callback();
                    }
                });
            } else {
                var err = new Error('User not found');
                return callback(err);
            }

        });
}


//hash password before saving to the database
UserDataSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.user_pass, 3, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.user_pass = hash;
        next();
    });
});

var UserData = mongoose.model('user_data', UserDataSchema, 'user_data');

module.exports = UserData;