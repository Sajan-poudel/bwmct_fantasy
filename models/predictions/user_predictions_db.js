var mongoose = require('mongoose');

var PredictionsDataSchema = new mongoose.Schema({

    user_name: {
        type: String,
        required: true,
    },

    user_id: {
        type: String,
        required: true
    },

    user_secret: {
        type: String,
        required: true
    },

    user_team: {
        type: String,
        required: true
    },

    user_player: {
        type: String,
        required: true
    }



});

var PredictionData = mongoose.model('user_predict_data', PredictionsDataSchema, 'user_predict_data');

module.exports = PredictionData;