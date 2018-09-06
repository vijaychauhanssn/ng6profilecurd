    const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/db');
   var fs = require('fs');
   const app = express();
   const multer = require('multer');
 
    var formidable = require('formidable');
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );
    //core access control send a rquest in server
    app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
    });
    const ProfiletRoutes = require('./routes/profile.route');
    app.use(express.static(path.join(__dirname, 'public')))
    app.use(bodyParser.json());
    app.use(cors());
    const port = process.env.PORT || 4000;

    app.use('/profiles', ProfiletRoutes);

    /* Setup File upload */
    const upload = multer({
      limits: { fileSize: 5 * 1024 * 1024 },
      storage: multer.diskStorage({
        destination(req, file, cb) {
          cb(null, 'avatars/'); // avatars Save the file to a folder.
        },
        filename(req, file, cb) {
          cb(null, file.originalname); // Transferred files Save files by their names.
        }
      })
    });

    /* ROUTERS */
    app.post('/upload', upload.single('avatar'), (req, res) => {
      console.log('UPLOAD SUCCESS!', req.file);
      res.json({ success: true, file: req.file });
    });

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);

    });