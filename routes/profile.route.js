const express = require('express');
const app = express();
const ProfiletRoutes = express.Router();
var multer = require('multer');
var path =require('path');
// Require AddProfile model in our routes module
let AddProfile = require('../models/AddProfile');


// Defined store route
ProfiletRoutes.route('/add').post(function (req, res) {
  let addProfile = new AddProfile(req.body);
  addProfile.save()
    .then(game => {
    res.status(200).json({'addProfile': 'AddProfile in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
ProfiletRoutes.route('/').get(function (req, res) {
    AddProfile.find(function (err, adUnits){
    if(err){
      console.log(err);
    }
    else {
      res.json(adUnits);
    }
  });
});

// Defined edit route
ProfiletRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  AddProfile.findById(id, function (err, addProfile){
      res.json(addProfile);
  });
});

//  Defined update route
ProfiletRoutes.route('/update/:id').post(function (req, res) {
    AddProfile.findById(req.params.id, function(err, addProfile) {
    if (!addProfile)
      return next(new Error('Could not load Document'));
    else {
        addProfile.fname = req.body.fname;
        addProfile.lname = req.body.lname;
        addProfile.username = req.body.username;
        addProfile.save().then(addProfile => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
ProfiletRoutes.route('/delete/:id').get(function (req, res) {
    AddProfile.deleteOne({_id: req.params.id}, function(err, addProfile){
        if(err) res.json(err);
        else res.json('Successfully removed');
         setTimeout(()=> {
                this._id = true;
            }, 1000);
    });
});
module.exports = ProfiletRoutes;