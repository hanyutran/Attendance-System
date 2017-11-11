var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
var async = require('async');
var Data = require('../models/data');
var Student = require('../models/student');
var Course = require('../models/course');
var User = require('../models/user');

var {arrayAverage} = require('../myFunctions');


module.exports = (app) => {
    
    app.get('/course/create', (req, res) => {
        var success = req.flash('success');
        res.render('course/course', {title: 'Course Registration', user: req.user, success:success, noErrors: success.length > 0});
    });
    
    app.post('/course/create', (req, res) => {
        
        var newCourse = new Course();
        newCourse.name = req.body.name;
        newCourse.room = req.body.room;
        newCourse.prof = req.body.prof;
        newCourse.credit = req.body.credit;
        newCourse.semester = req.body.semester;
        newCourse.time = req.body.time;
        newCourse.image = req.body.upload;
        
        newCourse.save((err) => {
            if(err){
                console.log(err);
            }
            
            console.log(newCourse);
            
            req.flash('success', 'Course data has been added.');
            res.redirect('/course/create');
        })
    });
    
    app.post('/upload', (req, res) => {
        var form = new formidable.IncomingForm();
        
        form.uploadDir = path.join(__dirname, '../public/uploads');
        
        form.on('file', (field, file) => {
           fs.rename(file.path, path.join(form.uploadDir, file.name), (err) => {
               if(err){
                   throw err
               }
               
               console.log('File has been renamed');
           }); 
        });
        
        form.on('error', (err) => {
            console.log('An error occured', err);
        });
        
        form.on('end', () => {
            console.log('File upload was successful');
        });
        
        form.parse(req);
        
    });
    
    app.get('/courses', (req, res) => {
        Course.find({}, (err, result) => {
            res.render('course/courses', {title: 'All Courses', user: req.user, data: result});
        });
    });
    
    app.get('/course-profile/:id', (req, res) => {
        Course.findOne({'_id':req.params.id}, (err, data) => {
            Data.find({}, function(err,room) {
                Student.find({}, function(err,student) {
                    res.render('course/course-profile', {title: 'Course Name', user:req.user, id: req.params.id, data:data, room:room, student:student});
                });
            });            
        });
    });
    

    app.get('/course/search', (req, res) => {
        res.render('course/search', {title: 'Find a Course', user:req.user});
    });
    
    app.post('/course/search', (req, res) => {
        var name = req.body.search;
        var regex = new RegExp(name, 'i');
        
        Course.find({'$or': [{'name':regex}]}, (err, data) => {
            if(err){
                console.log(err);
            }            
            res.redirect('/course-profile/'+data[0]._id);
        });
    });    
}