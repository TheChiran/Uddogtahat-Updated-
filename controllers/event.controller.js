const Event = require('../model/events/events.model');
const EventSectionBackground = require('../model/homePage/eventSectionBackground.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const WebsiteTitle = require('../model/homePage/website.title.model');

let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});

var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');
let bcrypt = require('bcryptjs');

let eventestorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/event')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadEvent = multer({storage:eventestorage}).single('eventimage');

let eventSectionStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/eventSectionBackground')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadEventSectionBackground = multer({storage:eventSectionStorage}).single('eventSectionBackground');


exports.upcoming_event= function(req,res){
    let upcomingEvents = Event.find({'eventType':'Upcoming'}).sort({'_id':-1}).limit(5);
    upcomingEvents.exec(function(err,eventValues){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){
                    res.render('Event/upcoming-event',{
                        events: eventValues,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    });
                })
            })
        })
    })
}

exports.update_event= function(req,res){
    let updateEvents = Event.find({'eventType':'Update'}).sort({'_id':-1}).limit(5);
    updateEvents.exec(function(err,eventValues){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){
                    if(err) throw err;
                    res.render('Event/update-event',{
                        events: eventValues,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    });
                })
            })
        })
    })
}

exports.event_single = function(req,res){
    let id = req.params.id;
    let eventSingle = Event.find({'_id': id});
    eventSingle.exec(function (err,singleEvent) {
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){
                    if(err) throw err;
                    res.render('Event/event-single',{
                        event: singleEvent,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    });
                })
            })
        })
    })
}

exports.home_page_event = function(req,res){
    res.render('Home/home-page-event-background',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.home_page_event_post = function(req,res){
    uploadEventSectionBackground(req,res,function(err){
        if(err) throw err;
        let eventSectionBackground = new EventSectionBackground({
            image: req.file.filename
        });
        eventSectionBackground.save(function(err){
            if(err) throw err;
            res.send('Successfully Uploaded!');
        })

    })
}

exports.event_page=function(req,res){
    res.render('Event/event',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    });
}

exports.event_page_post=function(req,res){
    var d = new Date();
    var months = ["January","February","March","April",
        "May","June","July","August","September","October","November","December"];
    var fullDate = months[d.getMonth()]+' '+d.getDate()+' ,'+d.getFullYear();
    uploadEvent(req,res,function(err){
        if(err) throw err;
        let event = new Event({
            name: req.body.name,
            eventType: req.body.eventType,
            eventImage:req.file.filename,
            description: req.body.eventDescription,
            date: fullDate
        });
        event.save(function(err){
            if(err) throw err;
            res.send('New Event added!');
        })
    })
}

exports.manage_events=function(req,res){
    let events = Event.find({'eventType':'Upcoming'});
    events.exec(function(err,eventDatas){
        if(err) throw err;
        res.render('Event/manage-events',{
            events: eventDatas,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
    })
}



exports.event_done = function(req,res){
    var id = req.params.id;
    console.log(id);
    Event.updateOne({'_id':id},{
        $set:{
            eventType: req.body.eventType
        }
    },function(err){
        if(err) throw err;
        res.send('Event Done!');
    })
}




