// AddProfile.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var path = require('path');

// Define collection and schema for AdUnits
let AddProfile = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  username: {
  	type:String
  }

},{
    collection: 'profiles'
});

module.exports = mongoose.model('AddProfile', AddProfile);