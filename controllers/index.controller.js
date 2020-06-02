//const Members = require('../model/applicant/applicant.general.info.model');
const Company = require('../model/company/company.information.model');
const Gallery = require('../model/gallary/gallary.model');
const Activity = require('../model/activities/activities.model');
const Committee = require('../model/committee/committee.model');
const Event = require('../model/events/events.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const Quotes = require('../model/homePage/quotes.model');
const HomePageAboutSectionSkills = require('../model/homePage/about.section.skills.model');
const HomePageAboutSectionBackground = require('../model/homePage/about.section.background.model');
const HomePageAboutSectionContents = require('../model/homePage/about.section.contents.model');
const EventSectionBackground = require('../model/homePage/eventSectionBackground.model');
const WebsiteTitle = require('../model/homePage/website.title.model');
let HomePageSlider = require('../model/homePage/slider.section.model');

let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});


let async = require('async');
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');

//to store logo of the website
let logoStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/logo')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadLogo = multer({storage:logoStorage}).single('logoImage'); //to store logo

let quoteStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/quote')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

//to store quote background
let uploadQuote = multer({storage:quoteStorage}).single('quoteIcon'); //to store quote icon

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

//to store background for event section
let uploadEventSectionBackground = multer({storage:eventSectionStorage}).single('eventSectionBackground');

let aboutContentStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/aboutBackground')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

//to store background for about content
let uploadAboutContent = multer({storage:aboutContentStorage}).single('aboutContentBackground');

let homePageSliderStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/homePageSlider')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

//to store background for slider
let homePageSliderUpload = multer({storage:homePageSliderStorage}).single('homePageSliderBg');

exports.homePage = async function(req,res,next){
    let quoteQuery = Quotes.find().limit(3).sort({'_id':-1});
    let committeeQuery = Committee.find().limit(3).sort({'_id':-1}).select({"image":1
    ,"name":1,"companyname":1,"designation":1});
    let companiesQuery = Company.find({"approval":"1"}).limit(5).sort({'_id':-1}).select({
        "logo":1
    });
    let galleryQuery = Gallery.find().limit(6).sort({'_id':-1});
    let homepageaboutSectionSkillsQuery = HomePageAboutSectionSkills.find().sort({'_id':-1});
    let homepageaboutSectionBackgroundQuery = HomePageAboutSectionBackground.find().limit(1).sort({'_id':-1});
    let homePageAboutSectionContentQuery = HomePageAboutSectionContents.find().limit(1).sort({'_id':-1});
    let eventQuery = Event.find({'eventType':'Upcoming'}).limit(4).select({"name": 1,"date": 1}).sort({'_id':-1});
    let eventBackgroundQuery = EventSectionBackground.find().limit(1).sort({'_id':-1});
    let blogQuery = Activity.find().limit(3).select({"image": 1,"title": 1}).sort({'_id':-1});
    let sliderQuery = HomePageSlider.find().limit(5).sort({'_id':-1});

    // Get Rid of Callback Hell async(parallel)
   async.parallel({
        pageTitle: function(callback){
          webTitle.exec()
              .then((title)=>{
                  callback(null,title)
              })
              .catch((error)=>{
                  console.log(error.message)
                  callback(error,null)
              })
              .catch(next)
        },
        pageLogo: function(callback){
        logo.exec()
            .then((logo)=>{
                callback(null,logo)
            })
            .catch((error)=>{
                console.log(error.message)
                callback(error,null)
            })
            .catch(next)
        },
        socialaccount:function(callback){
            socialAccounts.exec()
                .then((socialAccounts)=>{
                    callback(null,socialAccounts)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        },
        committeemembers: function(callback){
            committeeQuery.exec()
                .then((committeeMembers)=>{
                    callback(null,committeeMembers)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        },
        companiessection: function(callback){
          companiesQuery.exec()
              .then((companyLogo)=>{
                  callback(null,companyLogo)
              })
              .catch((error)=>{
                  console.log(error.message)
                  callback(error,null)
              })
              .catch(next)
        },
        galleries: function(callback){
            galleryQuery.exec()
              .then((gallaryData)=>{
                  callback(null,gallaryData)
              })
              .catch((error)=>{
                  console.log(error.message)
                  callback(error,null)
              })
              .catch(next)
        },
        homepageaboutsectionskills: function(callback){
          homepageaboutSectionSkillsQuery.exec()
              .then((aboutSectionSkillsContent)=>{
                  callback(null,aboutSectionSkillsContent)
              })
              .catch((error)=>{
                  console.log(error.message)
                  callback(error,null)
              })
              .catch(next)
        },
        homepageaboutsectioncontent: function(callback){
          homePageAboutSectionContentQuery.exec()
              .then((homePageAboutSectionContent)=>{
                  callback(null,homePageAboutSectionContent)
              })
              .catch((error)=>{
                  console.log(error.message)
                  callback(error,null)
              })
              .catch(next)
        },
        homepageaboutsectionbackground: function(callback){
            homepageaboutSectionBackgroundQuery.exec()
                .then((homepageaboutsectionbackground)=>{
                    callback(null,homepageaboutsectionbackground)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        },
        eventsectionbackground:function(callback){
            eventBackgroundQuery.exec()
                .then((eventsectionbackground)=>{
                    callback(null,eventsectionbackground)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        },
        eventsectioncontnets: function(callback){
            eventQuery.exec()
                .then((events)=>{
                    callback(null,events)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        },
        blogsection: function(callback){
            blogQuery.exec()
                .then((blogs)=>{
                    callback(null,blogs)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        },
        slidersection: function(callback){
          sliderQuery.exec()
              .then((sliderContents)=>{
                  callback(null,sliderContents)
              })
              .catch((error)=>{
                  console.log(error.message)
                  callback(error,null)
              })
              .catch(next)
        },
        quotessection:function(callback){
            quoteQuery.exec()
                .then((quotes)=>{
                    callback(null,quotes)
                })
                .catch((error)=>{
                    console.log(error.message)
                    callback(error,null)
                })
                .catch(next)
        }
    },function(err,indexData){
        if(err) throw err;
        res.render('Home/index',{
            socialAccounts: indexData.socialaccount,
            logo: indexData.pageLogo,
            quotes: indexData.quotessection,
            commiteeMembers: indexData.committeemembers,
            companies: indexData.companiessection,
            gallery: indexData.galleries,
            abouts: indexData.homepageaboutsectionskills,
            aboutsectionbackground: indexData.homepageaboutsectionbackground,
            events: indexData.eventsectioncontnets,
            eventBackground: indexData.eventsectionbackground,
            blogs: indexData.blogsection,
            aboutSectionContents: indexData.homepageaboutsectioncontent,
            slider: indexData.slidersection,
            title: indexData.pageTitle,
            page_name: 'Home'
        })
    })
}


//to get page for logo upload
exports.logoUpload=function(req,res){
    res.render('Home/logoinput',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Home'
    })
}

//to post logo upload
exports.logoUploadPost=function(req,res){
    uploadLogo(req,res,function(err){
        if(err) throw err;
        /*let logo = new Logo({
            image: req.file.filename
        });
        logo.save(function(err){
            if(err) throw err;

        })*/
        let logo = new Logo();
        logo.image=req.file.filename;
        let logoUploadStatus = logo.save();
        if(logoUploadStatus){
            res.send('Logo Uploaded!')
        }
        if(!logoUploadStatus){
            res.send(new Error('There was some problem'))
        }
    })
}

//to get quote upload page
exports.quotePage=function(req,res){
    res.render('Home/quotes',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Home'
    })
}

//to post quote
exports.quotePost = function(req,res){
    uploadQuote(req,res,function(err){
        if(err) throw err;
        let quote = new Quotes();
        quote.quote=req.body.quote;
        quote.image=req.file.filename;
        let quoteUploadStatus=quote.save();
        if(quoteUploadStatus){
            res.send('Quote uploaded!')
        }
        if(!quoteUploadStatus){
            res.send(new Error('There was some problem'))
        }
    })
}

//to get background page for home event
exports.homePageEvent = function(req,res){
    res.render('Home/home-page-event-background',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Home'
    })
}

//to post event background for home page
exports.homePageEventPost = async function(req,res,next){
    uploadEventSectionBackground(req,res,async function(err){
        if(err) throw err;
        let eventSectionBackground = new EventSectionBackground();
        eventSectionBackground.image=req.file.filename;
        try{
            await eventSectionBackground.save();
        }
        catch (error) {
            throw error;
        }
        res.send('Successfully Uploaded!');
    })
}

//to get home page skill page
exports.homePageAbout = function(req,res){
    res.render('Home/homePageAboutSection',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Home'
    })
}

//to post skills
exports.homePageAboutContentPost = async function(req,res,next){
    let skill = req.body.skill;
    let percentage = req.body.percentage;
    let contents = req.body.contents;
    if(contents ===''){
        let homePageAboutSectionSkills = new HomePageAboutSectionSkills();
        homePageAboutSectionSkills.skill=skill;
        homePageAboutSectionSkills.percentage=percentage;

        try{
            await homePageAboutSectionSkills.save();
        }
        catch (error) {
            throw error;
        }
        res.send('New Skill Added!')
    }else if(skill ==='' || percentage ===''){
        let homePageAboutSectionContents = new HomePageAboutSectionContents();
        homePageAboutSectionContents.contents=contents;
        try{
            await homePageAboutSectionContents.save();
        }
        catch (error) {
            throw error;
        }
        res.send('Contents Uploaded')

    } else if( contents !='' && skill !='' && percentage !=''){
        let homePageAboutSectionSkills = new HomePageAboutSectionSkills();
        homePageAboutSectionSkills.skill=req.body.skill;
        homePageAboutSectionSkills.percentage=req.body.percentage;

        let homePageAboutSectionContents = new HomePageAboutSectionContents();
        homePageAboutSectionContents.contents=req.body.contents;
        try{
            await homePageAboutSectionSkills.save();
            await homePageAboutSectionContents.save();
        }
        catch (error) {
            throw error;
        }
        res.send('New Contents uploaded')
    }

}

//to post background for home page about
exports.homePageAboutContentBackgroundPost = async function(req,res){
    uploadAboutContent(req,res,async function(err){
        if(err) throw err;
        let aboutBackground = new HomePageAboutSectionBackground();
        aboutBackground.image=req.file.filename;

        try{
         await aboutBackground.save();
        }
        catch (error) {
            throw error;
        }
        res.redirect('/home-page-about');

    })
}

//to get slider page for home
exports.homePageSlider = function(req,res){
    res.render('Home/homePageSlider',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage,
        page_name: 'Home'
    })
}

//to post home page slider contents
exports.homePageSliderPost = async function(req,res){
    homePageSliderUpload(req,res,async function(err){
        if(err) throw err;
        let homePageSlider = new HomePageSlider({
            title: req.body.homePageSliderTitle,
            content: req.body.homePageSliderContent,
            image: req.file.filename
        });
        homePageSlider.title=req.body.homePageSliderTitle;
        homePageSlider.content=req.body.homePageSliderContent;
        homePageSlider.image=req.file.filename;

        try{
            await homePageSlider.save();
        }
        catch(error){
            throw error;
        }
        res.send('New Content Uploaded!');
    })
}


