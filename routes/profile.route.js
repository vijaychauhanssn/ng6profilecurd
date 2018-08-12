// profile.route.js

const express = require('express');
const app = express();
const ProfiletRoutes = express.Router();

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
  AddProfile.findById(id, function (err, adUnit){
      res.json(adUnit);
  });
});

//  Defined update route
ProfiletRoutes.route('/update/:id').post(function (req, res) {
    AddProfile.findById(req.params.id, function(err, adUnit) {
    if (!adUnit)
      return next(new Error('Could not load Document'));
    else {
        adUnit.unit_name = req.body.unit_name;
        adUnit.unit_price = req.body.unit_price;

        adUnit.save().then(adUnit => {
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
    AddProfile.findByIdAndRemove({_id: req.params.id}, function(err, adUnit){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = ProfiletRoutes;