const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema ({
    title: String,
    body: String
});
const BlogPost2 = mongoose.model('BlogPost2', BlogPostSchema);
module.exports = BlogPost2