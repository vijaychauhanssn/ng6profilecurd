const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./config/db');

    const app = express();
   var multer = require('multer');
    // img path
   //var imgPath = 'src/assets/imgs/img_avatar1.png';
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
    );
    //var multer = require('multer');
    //var upload = multer({ dest: './uploads' });
    //app.use(multer({dest:'./uploads/'}).single('profile_img'));
    app.use(multer({dest:'./uploads/'}).single('singleInputFileName'));
    //app.set(multer({dest: "./uploads"}));
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

    const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });