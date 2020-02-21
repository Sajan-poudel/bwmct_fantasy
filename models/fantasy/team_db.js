var mongoose = require('mongoose');

var TeamDataSchema = new mongoose.Schema({

    name: {
        unique: true,
        type: String,
        required: true,
    },

    players: {
        type: [],
        required: true
    }

});

var TeamData = mongoose.model('team_data', TeamDataSchema, 'team_data');

module.exports = TeamData;