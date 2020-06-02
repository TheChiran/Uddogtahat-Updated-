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

let async = require('async');

//to get upcoming event list
exports.upcomingEventList= function(req,res){
    let upcomingEvents = Event.find({'eventType':'Upcoming'}).sort({'_id':-1}).limit(5);
    async.parallel({
        eventList: function(callback){
            upcomingEvents.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function(callback){
            socialAccounts.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        res.render('Event/upcoming-event',{
            events: data.eventList,
            title: data.webTitle,
            socialAccounts: data.socialAccountList,
            logo: data.logo,
            page_name: 'Event'
        });
    })
    /*upcomingEvents.exec(function(err,eventValues){
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
    })*/
}

//to get update event list
exports.updateEventList= function(req,res){
    let updateEvents = Event.find({'eventType':'Update'}).sort({'_id':-1}).limit(5);
    async.parallel({
        eventList: function(callback){
            updateEvents.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function(callback){
            socialAccounts.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        res.render('Event/update-event',{
            events: data.eventList,
            title: data.webTitle,
            socialAccounts: data.socialAccountList,
            logo: data.logo,
            page_name: 'Event'
        });
    })
    /*updateEvents.exec(function(err,eventValues){
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
    })*/
}

exports.eventSingle = function(req,res){
    let id = req.params.id;
    let eventSingle = Event.find({'_id': id});
    async.parallel({
        eventList: function(callback){
            eventSingle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function(callback){
            socialAccounts.exec()
                .then((data)=>{
                    callback(null,data);
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        res.render('Event/event-single',{
            event: data.eventList,
            title: data.webTitle,
            socialAccounts: data.socialAccountList,
            logo: data.logo,
            page_name: 'Event'
        });
    })
    /*eventSingle.exec(function (err,singleEvent) {
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
    })*/
}


//to get event page to post
exports.getEventPage=function(req,res){
    res.render('Event/event',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Event'
    });
}

//to post event contents
exports.eventPost = async function(req,res){
    var d = new Date();
    var months = ["January","February","March","April",
        "May","June","July","August","September","October","November","December"];
    var fullDate = months[d.getMonth()]+' '+d.getDate()+' ,'+d.getFullYear();
    uploadEvent(req,res,async function(err){
        if(err) throw err;
        let event = new Event();
            event.name= req.body.name;
            event.eventType= req.body.eventType;
            event.eventImage= req.file.filename;
            event.description= req.body.eventDescription;
            event.date= fullDate;

            try{
                await event.save();
                res.send('New Event added!');
            }
            catch (error) {
                throw error;
            }
        /*let event = new Event({
            name: req.body.name,
            eventType: req.body.eventType,
            eventImage:req.file.filename,
            description: req.body.eventDescription,
            date: fullDate
        });
        event.save(function(err){
            if(err) throw err;
            res.send('New Event added!');
        })*/
    })
}

//to manage events
exports.manageEvents=function(req,res){
    let events = Event.find({'eventType':'Upcoming'});
    events.exec(function(err,eventDatas){
        if(err) throw err;
        res.render('Event/manage-events',{
            events: eventDatas,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage,
            page_name: 'Event'
        })
    })
}

//to change event status
exports.changeEventToDone = function(req,res){
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




