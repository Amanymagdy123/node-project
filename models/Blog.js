const mongoose = require('mongoose');

const { Schema } = mongoose;

const blogShcema = new Schema({
    title: {
        type: String,
        maxLength: 256,
        required: true,
      },
      body: {
          type: String,
          createdAt: Date,
          required: true,
      },
      author:{
        type: String,
        maxLength: 240,
        required: true,
      },
      
      tags: [String],
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },

});
const blogModel = mongoose.model('Blog', blogSchema);

module.exports = blogModel;