const Activity = require('../model/activities/activities.model');
const ActivityPageHeader = require('../model/activities/activities.header.model');
const ActivityCategory = require('../model/activities/category.model');
const WebsiteTitle = require('../model/homePage/website.title.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const Category =  require('../model/activities/category.model');

/*File upload*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');
let async = require('async');

let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});

let activitystorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/activities')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});


//location to store activity page background
let uploadActivity = multer({storage:activitystorage}).single('activitypicture');

let activityPageHeaderStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/activities/header')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

//location to store activity page header background
let activityPageHeaderUpload = multer({storage:activityPageHeaderStorage}).single('activityPageHeaderBackground');

exports.activityList = function (req,res) {
    //to count total number of documents
    const totalActivity = Activity.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    let activities = Activity.find(query).limit(8).sort({'_id':-1});
    let activityHeaderQuery = ActivityPageHeader.find().limit(1).sort({'_id':-1});
    let activityCategoryQuery = ActivityCategory.find().limit(8).sort({'_id':-1});
    sess = req.session;
    async.parallel({
        totalActivityPages: function(callback){
            totalActivity.exec()
                .then((total)=>{
                    if(total<=8){
                        pages=1;
                    }else {
                        if(total % 8!=0){
                            pages=(Math.floor(total/8))+1;
                        }else{
                            pages=Math.floor(total/8);
                        }
                    }
                    callback(null,pages)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((title)=>{
                    callback(null,title)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccounts:function (callback) {
            socialAccounts.exec()
                .then((soccialAccountsData)=>{
                    callback(null,soccialAccountsData)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo:function(callback){
            logo.exec()
                .then((logo)=>{
                    callback(null,logo)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityHeaderBackground:function(callback){
            activityHeaderQuery.exec()
                .then((background)=>{
                    callback(null,background)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityCategory:function(callback){
            activityCategoryQuery.exec()
                .then((categoryList)=>{
                    callback(null,categoryList)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activities: function(callback){
            activities.exec()
                .then((activityData)=>{
                    callback(null,activityData)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,activitiesData){
        if(err) throw err;
        res.render('Activities/activities',{
            activities: activitiesData.activities,
            page:page,
            pages:activitiesData.totalActivityPages,
            title: activitiesData.webTitle,
            socialAccounts: activitiesData.socialAccounts,
            activityHeaderData: activitiesData.activityHeaderBackground,
            categories: activitiesData.activityCategory,
            logo: activitiesData.logo,
            page_name: 'Activity-list'
        })

    })

}

exports.activityListPage = async function(req,res,next){
    var page = req.params.page;
    var min;
    var max;
    if((page-1)==0){
        min=1;
        max=8;
    }else{
        min=((page-1)*8)+1;
        max=(min+8)-1;
    }
    var query={
        $and:[
            {"serial":{$gte:min}},{"serial":{$lte:max}}
        ]
    };
    const totalActivity= Activity.countDocuments();
    var pages;
    var activityData =Activity.find(query).limit(8).sort({'_id':-1});
    let activityHeaderQuery = ActivityPageHeader.find().limit(1).sort({'_id':-1});
    let activityCategoryQuery = ActivityCategory.find().limit(8).sort({'_id':-1});


    async.parallel({
        totalActivityPages: function(callback){
            totalActivity.exec()
                .then((total)=>{
                    if(total<=8){
                        pages=1;
                    }else {
                        if(total % 8!=0){
                            pages=(Math.floor(total/8))+1;
                        }else{
                            pages=Math.floor(total/8);
                        }
                    }
                    callback(null,pages)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((title)=>{
                    callback(null,title)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccounts:function (callback) {
            socialAccounts.exec()
                .then((soccialAccountsData)=>{
                    callback(null,soccialAccountsData)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo:function(callback){
            logo.exec()
                .then((logo)=>{
                    callback(null,logo)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityHeaderBackground:function(callback){
            activityHeaderQuery.exec()
                .then((background)=>{
                    callback(null,background)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityCategory:function(callback){
            activityCategoryQuery.exec()
                .then((categoryList)=>{
                    callback(null,categoryList)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityTotalData: function(callback){
            activityData.exec()
                .then((activityData)=>{
                    callback(null,activityData)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,activitiesData){
        if(err) throw err;
        if (page > pages || page < 1) {
            res.redirect('/activity/list')
        }else{
            res.render('Activities/activities',{
                activities: activitiesData.activityTotalData,
                page:page,
                pages:activitiesData.totalActivityPages,
                title: activitiesData.webTitle,
                socialAccounts: activitiesData.socialAccounts,
                activityHeaderData: activitiesData.activityHeaderBackground,
                categories: activitiesData.activityCategory,
                logo: activitiesData.logo,
                page_name: 'Activity-list'
            })
        }

    })

}

//to get single activity page
exports.activitySingle = function (req,res) {
    const id = req.params.id;
    let recentActivities = Activity.find().limit(5).sort({'_id':-1});
    let activity = Activity.find({'_id':id});
    let activityHeaderQuery = ActivityPageHeader.find().limit(1).sort({'_id':-1});
    let activityCategoryQuery = ActivityCategory.find().limit(8).sort({'_id':-1});
    async.parallel({
        activity: function(callback){
            activity.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        webTitle: function(callback){
            webTitle.exec()
                .then((title)=>{
                    callback(null,title)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccounts:function (callback) {
            socialAccounts.exec()
                .then((soccialAccountsData)=>{
                    callback(null,soccialAccountsData)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo:function(callback){
            logo.exec()
                .then((logo)=>{
                    callback(null,logo)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityBackground:function(callback){
            activityHeaderQuery.exec()
                .then((background)=>{
                    callback(null,background)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        activityCategory:function(callback){
            activityCategoryQuery.exec()
                .then((categoryList)=>{
                    callback(null,categoryList)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        recentActivities: function (callback) {
            recentActivities.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,activityData){
        if(err) throw err;
        res.render('Activities/activity-single',{
            activity: activityData.activity,
            title: activityData.webTitle,
            activitiesRecent: activityData.recentActivities,
            socialAccounts: activityData.socialAccounts,
            activityHeaderData: activityData.activityBackground,
            categories: activityData.activityCategory,
            logo: activityData.logo,
            page_name: 'Activity-list'
        })
    })

}

//to get activity post
exports.getActivityPage = function(req,res){
    ActivityCategory.find({},function(err,categories){
        res.render('Activities/activity_post',{
            categories: categories,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
    })
}

//to post activity
exports.activityPost = function(req,res){
    var d = new Date();
    var months = ["January","February","March","April",
        "May","June","July","August","September","October","November","December"];
    var fullDate = months[d.getMonth()]+' '+d.getDate()+' ,'+d.getFullYear();
    //console.log('FUll date: '+fullDate);
    let totalActivitySerial = Activity.countDocuments();
    var serial;
    uploadActivity(req,res,function(err){
        totalActivitySerial.exec(function(err,serialCounter){
            if(err) throw err;
            serial=serialCounter+1;
            let activity = new Activity({
                title: req.body.blogTitle,
                category: req.body.tag,
                postedby:req.body.blogPostedBy,
                summary: req.body.blogSummary,
                fullblog: req.body.blogStory,
                uploaddate: fullDate,
                image: req.file.filename,
                serial: serial
            })
            activity.save(function(err){
                if(err) throw err;
                res.end("File is uploaded!");
            })
        })

    })
}

//to get category post page for activity category
exports.categoryPage = function(req,res){
    res.render('Activities/category',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

//to post category for activity
exports.categoryPost = async function(req,res,next){
    let checkCategory = await Category.find({'name': req.body.blogCategory});
    if(checkCategory){
        res.send('This Category Is Already Created');
    }else{
        let category = new Category();
        category.name=req.body.blogCategory;
        try{
            await category.save();
        }
        catch (error) {
            throw error;
        }
        res.send('New Category Added!');
    }

}

//to get activity header post page
exports.activityPageHeader = function(req,res){
    res.render('Activities/activityPageHeader',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

//to post header for activity
exports.activityPageHeaderPost = async function(req,res){
    activityPageHeaderUpload(req,res,async function(err){
        if(err) throw err;
        let activityPageHeader = new ActivityPageHeader();
        activityPageHeader.title=req.body.activityPageHeaderTitle;
        activityPageHeader.content=req.body.activityPageHeaderContent;
        activityPageHeader.image=req.file.filename;
        try{
            await activityPageHeader.save();
        }
        catch (error) {
            throw error;
        }
        res.send('New Header Uploaded!');
    })
}
