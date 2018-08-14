var express = require('express')
var bodyParser = require('body-parser')
var app = express()
//var ejs = require('ejs')
var multer = require('multer')

var path = require('path')
var fs = require('fs')

var mongoose = require('mongoose')
mongoose.Promise = global.Promise
const ImagesRoutes = express.Router();

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

app.post('/file_upload', upload.single('file'), function (req, res) {
    var image = new Model()
    image.path = req.file.filename
    image.description = req.body.description
    image.save(function (err) {
        if (err) return next(err)
        return res.redirect('/home')
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

module.exports = ImagesRoutes;