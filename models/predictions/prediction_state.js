var mongoose = require('mongoose');

var PredictionStateSchema = new mongoose.Schema({

    state: {
        type: String,
        required: true
    }
});

var PredictionState = mongoose.model('admin_predict_state', PredictionStateSchema, 'admin_predict_state');

module.exports = PredictionState;