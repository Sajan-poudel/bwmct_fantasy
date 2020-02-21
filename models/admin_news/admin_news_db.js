var mongoose = require('mongoose');

var NewsPostSchema = new mongoose.Schema({

    post_name: {
        type: String,
        required: true,
    },

    post_author: {
        type: String,
        required: true,
    },

    post_date: {
        type: Date,
        default: Date.now
    },

    post_news: {
        type: String,
        required: true
    },

    post_image: {
        type: String,
        required: true
    }

});

var GalleryPostSchema = new mongoose.Schema({

    post_name: {
        type: String,
        required: true,
    },

    post_image: {
        type: String,
        required: true
    }

});

var NewsPost = mongoose.model('kct_news', NewsPostSchema);

module.exports = NewsPost;