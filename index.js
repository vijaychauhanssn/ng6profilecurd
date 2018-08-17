var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var ejs = require('ejs')
var multer = require('multer')

var path = require('path')
var fs = require('fs')

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/testdatabase')
mongoose.Promise = global.Promise

 app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin", '*');
res.header("Access-Control-Allow-Credentials", true);
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
next();
});

var Schema = mongoose.Schema

var ImagesModel = new Schema({
    path: String,
    description: String
}, {
    collection: 'images'
})

var Model = mongoose.model('Model', ImagesModel)

app.get('/', function (req, res, next) {
    res.render('index')
})

app.get('/images', function (req, res, next) {
    Model
        .find({})
        .exec(function (err, data) {
            if (err) return next(err)
            res.render('images', {
                data: data
            })
        })
})

app.use(express.static(__dirname + '/uploads'))
app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('view engine', 'ejs')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
})

app.post('src/app/components/image/file_upload', upload.single('file'), function (req, res) {
    var image = new Model()
    image.path = req.file.filename
    image.description = req.body.description
    image.save(function (err) {
        if (err) return next(err)
        return res.redirect('/images')
    })
})

app.post('/remove_image', upload.single('file'), function (req, res) {
    Model.remove({
        _id: req.body.image_document_id
    } ,function(err) {
        if (err) throw err

        fs.unlink(`./uploads/${req.body.image_name}`, function(err) {
            if (err) throw err

            console.log('Successfully deleted image')

            res.redirect('/images')
        })
    })
})
app.use(express.static(path.join(__dirname, 'src/app')));
app.listen(8080, function () {
    console.log('Node.js listening on port ' + 8080)
})
