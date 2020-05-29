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

let activityPageHeaderUpload = multer({storage:activityPageHeaderStorage}).single('activityPageHeaderBackground');

exports.activities = function (req,res) {
    const totalActivity = Activity.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    let activityData = Activity.find(query).limit(8).sort({'_id':-1});
    let activityHeaderQuery = ActivityPageHeader.find().limit(1).sort({'_id':-1});
    let activityCategoryQuery = ActivityCategory.find().limit(8).sort({'_id':-1});
    sess = req.session;
    totalActivity.exec(function (err,total) {
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                activityHeaderQuery.exec(function(err,activityHeaderData){
                    if(err) throw err;
                    activityCategoryQuery.exec(function(err,activityCategory){
                        if(err) throw err;
                        logo.exec(function(err,logo){
                            if(err) throw err;
                            activityData.exec(function (err,activityResult) {
                                if(err) throw err;
                                if(total<=8){
                                    pages=1;
                                }else {
                                    if(total % 8!=0){
                                        pages=(Math.floor(total/8))+1;
                                    }else{
                                        pages=Math.floor(total/8);
                                    }
                                }
                                /*calculate total page number*/
                                res.render('Activities/activities',{
                                    activities: activityResult,
                                    page:page,
                                    pages:pages,
                                    title: title,
                                    socialAccounts: socialAccounts,
                                    activityHeaderData: activityHeaderData,
                                    categories: activityCategory,
                                    logo: logo
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}

exports.activities_get_page = function(req,res){
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
    totalActivity.exec(function (err,total) {
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                activityHeaderQuery.exec(function(err,activityHeaderData){
                    if(err) throw err;
                    activityCategoryQuery.exec(function(err,activityCategory){
                        if(err) throw err;
                        logo.exec(function(err,logo){
                            if(err) throw err;
                            activityData.exec(function (err,activityResult) {
                                if(err) throw err;
                                if(total<=8){
                                    pages=1;
                                }else {
                                    if(total % 8!=0){
                                        pages=(Math.floor(total/8))+1;
                                    }else{
                                        pages=Math.floor(total/8);
                                    }
                                }
                                /*calculate total page number*/
                                if (page > pages || page < 1) {
                                    res.redirect('/activities')
                                } else {
                                    res.render('Activities/activities',{
                                        activities: activityResult,
                                        page:page,
                                        pages:pages,
                                        title: title,
                                        socialAccounts: socialAccounts,
                                        activityHeaderData: activityHeaderData,
                                        categories: activityCategory,
                                        logo: logo
                                    })
                                }
                            })
                        })
                    })
                })
            })
        })
    })

}

exports.activitiesSingle = function (req,res) {
    const id = req.params.id;
    let activityData = Activity.find().limit(5).sort({'_id':-1});
    let activityHeaderQuery = ActivityPageHeader.find().limit(1).sort({'_id':-1});
    let activityCategoryQuery = ActivityCategory.find().limit(8).sort({'_id':-1});
    Activity.find({'_id':id},function(err,singleActivity){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            activityData.exec(function(err,activityRecent){
                if(err) throw err;
                socialAccounts.exec(function(err,socialAccounts){
                    if(err) throw err;
                    activityHeaderQuery.exec(function(err,activityHeaderData){
                        if(err) throw err;
                        activityCategoryQuery.exec(function(err,activityCategory){
                            if(err) throw err;
                            logo.exec(function(err,logo){
                                if(err) throw err;
                                res.render('Activities/activities-single',{
                                    activity:singleActivity,
                                    activitiesRecent: activityRecent,
                                    title: title,
                                    socialAccounts: socialAccounts,
                                    activityHeaderData: activityHeaderData,
                                    categories: activityCategory,
                                    logo: logo
                                })
                            })
                        })
                    })
                })
            })
        })
    })
}


exports.get_activity_page = function(req,res){
    ActivityCategory.find({},function(err,categories){
        res.render('Activities/activity_post',{
            categories: categories,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
    })
}

exports.activity_post = function(req,res){
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

exports.category = function(req,res){
    res.render('Activities/category',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.category_post = async function(req,res){
    let checkCategory = await Category.find({'name': req.body.blogCategory});
    if(checkCategory){
        res.send('This Category Is Already Created');
    }else{
        let category = new Category({
            name: req.body.blogCategory
        })
        category.save(function(err){
            if(err) throw err;
            res.send('New Category Created!');
        })
    }

}

exports.activityPageHeader = function(req,res){
    res.render('Activities/activityPageHeader',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.activityPageHeaderPost = function(req,res){
    activityPageHeaderUpload(req,res,function(err){
        if(err) throw err;
        let activityPageHeader = new ActivityPageHeader({
            title: req.body.activityPageHeaderTitle,
            content: req.body.activityPageHeaderContent,
            image: req.file.filename
        });
        activityPageHeader.save(function(err){
            if(err) throw err;
            res.send('New Content Uploaded!');
        })
    })
}
