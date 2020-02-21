var mongoose = require('mongoose');

var PlayersDataSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    price: {
        type: Number,
        required: true
    },

    teamName: {
        type: String,
        required: true
    },

    matchStats: {
        type: [],
    },

    points: {
        type: Number,
        default: 0,
    },

    allPoints: {
        type: []
    }



});

var PlayerData = mongoose.model('player_data', PlayersDataSchema, 'player_data');

module.exports = PlayerData;