var mongoose = require('mongoose');

var PredictionsDataSchema = new mongoose.Schema({

    team1_name: {
        type: String,
        required: true
    },
    team2_name: {
        type: String,
        required: true
    },
    author_name: {
        type: String,
        required: true
    },
    game_name: {
        type: String,
        required: true
    }

});

var PredictionData = mongoose.model('admin_predict_data', PredictionsDataSchema, 'admin_predict_data');

module.exports = PredictionData;