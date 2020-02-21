var mongoose = require('mongoose');

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

var GalleryPost = mongoose.model('kct_gallery', GalleryPostSchema);

module.exports = GalleryPost;