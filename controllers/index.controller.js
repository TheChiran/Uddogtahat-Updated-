//const Members = require('../model/applicant/applicant.general.info.model');
const Company = require('../model/company/company.information.model');
const Gallary = require('../model/gallary/gallary.model');
const Activity = require('../model/activities/activities.model');
const Contact = require('../model/contact/contact.page.model');
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
const ActivityPageHeader = require('../model/activities/activities.header.model');
const ActivityCategory = require('../model/activities/category.model');
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

let uploadLogo = multer({storage:logoStorage}).single('logoImage');

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

let uploadQuote = multer({storage:quoteStorage}).single('quoteIcon');

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

let homePageSliderUpload = multer({storage:homePageSliderStorage}).single('homePageSliderBg');

exports.index = async function(req,res,next){
    /*let quote = await Quotes.find().limit(3).sort({'_id':-1}).lean().exec();
    let committee = await Committee.find().limit(3).sort({'_id':-1}).select({"image":1
        ,"name":1,"companyname":1,"designation":1}).lean().exec();
    let companies = await Company.find({"approval":"1"}).limit(5).sort({'_id':-1}).select({
        "logo":1
    }).lean().exec();
    let gallary = await Gallary.find().limit(6).sort({'_id':-1}).lean().exec();
    let homepageAboutSectionSkills = await HomePageAboutSectionSkills.find().sort({'_id':-1}).lean().exec();
    let homepageAboutSectionBackground = await HomePageAboutSectionBackground.find().limit(1).sort({'_id':-1}).lean().exec();
    let homePageAboutSectionContent = await HomePageAboutSectionContents.find().limit(1).sort({'_id':-1}).lean().exec();
    let event = await Event.find({'eventType':'Upcoming'}).limit(4).select({"name": 1,"date": 1}).sort({'_id':-1}).lean().exec();
    let eventBackgroundQ = await EventSectionBackground.find().limit(1).sort({'_id':-1}).lean().exec();
    let blog = await Activity.find().limit(3).select({"image": 1,"title": 1}).sort({'_id':-1}).lean().exec();
    let slider = await HomePageSlider.find().limit(5).sort({'_id':-1}).lean().exec();
    let webTitle = await WebsiteTitle.find().limit(1).sort({'_id':-1}).lean().exec();
    let socialAccounts = await Social.find().lean().exec();
    let logo = await Logo.find().limit(1).sort({'_id':-1}).lean().exec();

    console.log(quote);
    console.log(committee);
    console.log(companies);
    console.log(gallary);
    console.log(homepageAboutSectionSkills);
    console.log(homepageAboutSectionBackground);
    console.log(homePageAboutSectionContent);
    console.log(event);
    console.log(eventBackgroundQ);
    console.log(blog);
    console.log(slider);
    res.render('Index/index',{
        socialAccounts: socialAccounts,
        logo: logo,
        quotes: quote,
        commiteeMembers: committee,
        companies: companies,
        gallary: gallary,
        abouts: homepageAboutSectionSkills,
        aboutsectionbackground: homepageAboutSectionBackground,
        aboutSectionContents: homePageAboutSectionContent,
        events: event,
        eventBackground: eventBackgroundQ,
        blogs: blog,
        slider: slider,
        title: webTitle
    })*/
    let quoteQuery = Quotes.find().limit(3).sort({'_id':-1});
    let committeeQuery = Committee.find().limit(3).sort({'_id':-1}).select({"image":1
    ,"name":1,"companyname":1,"designation":1});
    let companiesQuery = Company.find({"approval":"1"}).limit(5).sort({'_id':-1}).select({
        "logo":1
    });
    let gallaryQuery = Gallary.find().limit(6).sort({'_id':-1});
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
        gallaries: function(callback){
          gallaryQuery.exec()
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
            gallary: indexData.gallaries,
            abouts: indexData.homepageaboutsectionskills,
            aboutsectionbackground: indexData.homepageaboutsectionbackground,
            events: indexData.eventsectioncontnets,
            eventBackground: indexData.eventsectionbackground,
            blogs: indexData.blogsection,
            aboutSectionContents: indexData.homepageaboutsectioncontent,
            slider: indexData.slidersection,
            title: indexData.pageTitle
        })
    })
}


exports.get_logo_upload_page=function(req,res){
    res.render('Home/logoinput',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.logo_upload=function(req,res){
    uploadLogo(req,res,function(err){
        if(err) throw err;
        let logo = new Logo({
            image: req.file.filename
        });
        logo.save(function(err){
            if(err) throw err;
            res.send('Logo Uploaded!')
        })
    })
}
exports.get_quotes_page=function(req,res){
    res.render('Home/quotes',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.quotes_post = function(req,res){
    uploadQuote(req,res,function(err){
        if(err) throw err;
        let quote = new Quotes({
            quote: req.body.quote,
            image: req.file.filename
        });
        quote.save(function(err){
            if(err) throw err;
            res.send('Quote uploaded!')
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

exports.get_about_home_page = function(req,res){
    res.render('Home/homePageAboutSection',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.post_about_contents = function(req,res){
    let skill = req.body.skill;
    let percentage = req.body.percentage;
    let contents = req.body.contents;
    if(contents ===''){
        let homePageAboutSectionSkills = new HomePageAboutSectionSkills({
            skill: req.body.skill,
            percentage: req.body.percentage
        });
        homePageAboutSectionSkills.save(function(err) {
            if(err) throw err;
            res.send('New Skill Added!')
        })
    }else if(skill ==='' || percentage ===''){
        let homePageAboutSectionContents = new HomePageAboutSectionContents({
            contents: req.body.contents
        });
        homePageAboutSectionContents.save(function(err){
            if(err) throw err;
            res.send('New Content Uploaded!')
        })
    } else if( contents !='' && skill !='' && percentage !=''){
        let homePageAboutSectionSkills = new HomePageAboutSectionSkills({
            skill: req.body.skill,
            percentage: req.body.percentage
        });
        let homePageAboutSectionContents = new HomePageAboutSectionContents({
            contents: req.body.contents
        });
        homePageAboutSectionSkills.save(function(err) {
            if(err) throw err;
            homePageAboutSectionContents.save(function(err){
                if(err) throw err;
                res.send('New Contents Uploaded!')
            })
        })
    }

}

exports.post_about_contents_background = function(req,res){
    uploadAboutContent(req,res,function(err){
        if(err) throw err;
        let aboutBackground = new HomePageAboutSectionBackground({
            image: req.file.filename
        });
        aboutBackground.save(function(err){
            if(err) throw err;
            //res.send('Background added succesfully!');
            res.redirect('/home-page-about')
        })
    })
}

exports.homePageSlider = function(req,res){
    res.render('Home/homePageSlider',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

exports.homePageSliderPost = function(req,res){
    homePageSliderUpload(req,res,function(err){
        if(err) throw err;
        let homePageSlider = new HomePageSlider({
            title: req.body.homePageSliderTitle,
            content: req.body.homePageSliderContent,
            image: req.file.filename
        });
        homePageSlider.save(function(err){
            if(err) throw err;
            res.send('New Content Uploaded!');
        })
    })
}


