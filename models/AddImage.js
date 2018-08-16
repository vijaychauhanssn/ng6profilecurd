const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var path = require('path');

//var ImagesModel = new Schema({
  //  path: String,
   // description: String
//}, {
   // collection: 'profiles'
//});

//module.exports = mongoose.model('ImagesModel', ImagesModel);

// Define collection and schema for AdUnits
let AddImage = new Schema({
  file: {
    type: String
  },
  description: {
    type: String
  }
},{
    collection: 'profiles'
});

module.exports = mongoose.model('AddImage', AddImage);



