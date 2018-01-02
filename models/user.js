var mongoose = require('mongoose');
var Schema = mongoose.Schema

var userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  characters: [],
  profile: []
},
{
  timestamps: true
})

var User = mongoose.model('User', userSchema)

module.exports = { User }
