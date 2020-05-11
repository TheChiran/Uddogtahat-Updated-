//const Members = require('../model/applicant/applicant.general.info.model');
const Company = require('../model/company/company.information.model');
const Gallary = require('../model/gallary/gallary.model');
const Activity = require('../model/activities/activities.model');
const About = require('../model/about/about.page.model');
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
let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});


let HomePageSlider = require('../model/homePage/slider.section.model');
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});


let async = require('async');

exports.index = function(req,res,next){
    res.send('hello world')
    /*let quoteQuery = Quotes.find().limit(3).sort({'_id':-1});
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
    let sliderQuery = HomePageSlider.find().limit(5).sort({'_id':-1});*/

    /* Get Rid of Callback Hell async(parallel)*/
   /* async.parallel({
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
        res.render('Index/index',{
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
    })*/

    /* Get Rid of Callback Hell async(parallel)*/

    /*socialAccounts.exec(function(err,socialData){
        if(err) throw err;
        logo.exec(function(err,logo){
            if(err) throw err;
            committeeQuery.exec(function(err,committeeMembers){
                if(err) throw err;
                companiesQuery.exec(function(err,companyLogo){
                    if(err) throw err;
                    gallaryQuery.exec(function(err,gallaryData){
                        if(err) throw err;
                        homepageaboutSectionSkillsQuery.exec(function(err,aboutContents){
                            if(err) throw err;
                            homepageaboutSectionBackgroundQuery.exec(function(err,background){
                                if(err) throw err;
                                eventQuery.exec(function(err,events){
                                    if(err) throw err;
                                    blogQuery.exec(function(err,blogs){
                                        if(err) throw err;
                                        eventBackgroundQuery.exec(function(err,eventBackground){
                                            if(err) throw err;
                                            webTitle.exec(function(err,webtitle){
                                                if(err) throw err;
                                                homePageAboutSectionContentQuery.exec(function(err,homePageAboutSectionContent){
                                                    if(err) throw err;
                                                    sliderQuery.exec(function(err,sliderContents){
                                                        if(err) throw err;
                                                        quoteQuery.exec(function(err,quotes){
                                                            if(err) throw err;
                                                            res.render('Index/index',{
                                                                socialAccounts: socialData,
                                                                logo: logo,
                                                                quotes: quotes,
                                                                commiteeMembers: committeeMembers,
                                                                companies: companyLogo,
                                                                gallary: gallaryData,
                                                                abouts: aboutContents,
                                                                background: background,
                                                                events: events,
                                                                eventBackground: eventBackground,
                                                                blogs: blogs,
                                                                aboutSectionContents: homePageAboutSectionContent,
                                                                slider: sliderContents,
                                                                title: webtitle
                                                            })
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })

    })*/
}
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
                                res.render('Index/activities',{
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
                                    res.render('Index/activities',{
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
                                res.render('Index/activities-single',{
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
exports.about = function (req,res) {
    const aboutQuery = About.find().limit(1).sort({'_id':-1});
    aboutQuery.exec(function(err,aboutValues){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){
                    res.render('Index/about',{
                        aboutValues: aboutValues,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    })
                })
            })
        })
    })
}
exports.gallary = function (req,res) {
    const totalGallary = Gallary.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    let gallaryData = Gallary.find(query).limit(8).sort({'_id':-1});
    totalGallary.exec(function (err,total) {
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){


                    gallaryData.exec(function (err,gallaryResult) {
                        if(err) throw err;
                        /*calculate total page number*/
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
                        res.render('Index/gallary',{
                            gallary: gallaryResult,
                            page:page,
                            pages:pages,
                            title: title,
                            socialAccounts: socialAccounts,
                            logo: logo
                        })
                    })
                })
            })
        })
    })
}
exports.gallary_get_page = function(req,res){
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
    const totalGallary= Gallary.countDocuments();
    var pages;
    var gallaryData =Gallary.find(query).limit(8).sort({'_id':-1});
    totalGallary.exec(function (err,total) {
        if(err) throw err;
        logo.exec(function(err,logo){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                gallaryData.exec(function (err,gallaryResult) {
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
                        res.redirect('/gallary')
                    } else {
                        res.render('Index/gallary',{
                            gallary: gallaryResult,
                            page:page,
                            pages:pages,
                            logo: logo,
                            title: title
                        })
                    }
                })
            })
        })
    })

}
exports.members = function (req,res) {
    const totalCompany = Company.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}},{"approval":1}
        ]
    };
    var companyData =Company.find(query).limit(8).sort({'_id':-1}).select(
        {"logo":1,"website":1,"companyname":1}
        );
    totalCompany.exec(function (err,total) {
        if(err) throw err;
        socialAccounts.exec(function(err,socialAccounts){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                logo.exec(function(err,logo){
                    companyData.exec(function (err,companydata) {
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
                        res.render('Index/members',{
                            company:companydata,
                            page:page,
                            pages:pages,
                            socialAccounts: socialAccounts,
                            title: title,
                            logo: logo
                        })
                    })
                })
            })
        })
    })

}
exports.members_get_page = function(req,res){
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
    const totalCompany = Company.countDocuments();
    var pages;
    var companyData =Company.find(query).limit(8).sort({'_id':-1}).select(
        {"logo":1,"website":1}
    );
    totalCompany.exec(function (err,total) {
        if(err) throw err;
        socialAccounts.exec(function(err,socialAccounts){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                logo.exec(function(err,logo){
                    if(err) throw err;
                    companyData.exec(function (err,companydata) {
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
                        if (page > pages || page < 1) {
                            res.redirect('/members')
                        } else {
                            res.render('Index/members',{
                                company:companydata,
                                page:page,
                                pages:pages,
                                socialAccounts: socialAccounts,
                                title: title,
                                logo: logo
                            })
                        }
                    })
                })
            })
        })
    })

}
exports.contact = function (req,res) {
    const contactDetails = Contact.find().limit(1).sort({'_id':-1});
    contactDetails.exec(function(err,contactData){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function (err,logo) {
                    if(err) throw err;
                    res.render('Index/contact',{
                        contacts: contactData,
                        title: title,
                        socialAccounts: socialAccounts,
                        logo: logo
                    })
                })
            })
        })
    })
}
exports.commitee_page=function(req,res){
    const totalCommittee = Committee.countDocuments();
    var page=1;
    var pages;
    var query={
        $and:[
            {"serial":{$gte:1}},{"serial":{$lte:8}}
        ]
    };
    var committeeData =Committee.find(query).limit(8).sort({'_id':-1});
    totalCommittee.exec(function (err,total) {
        if(err) throw err;
        socialAccounts.exec(function(err,socialAccounts){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                logo.exec(function(err,logo){
                    committeeData.exec(function (err,committeedata) {
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
                        res.render('Index/commitee',{
                            committees:committeedata,
                            page:page,
                            pages:pages,
                            socialAccounts: socialAccounts,
                            title: title,
                            logo: logo
                        })
                    })
                })
            })
        })
    })
}
exports.commitee_get_page = function(req,res){
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
    const totalCommittee = Committee.countDocuments();
    var pages;
    var committeeData =Committee.find(query).limit(8).sort({'_id':-1});
    totalCommittee.exec(function (err,total) {
        if(err) throw err;
        logo.exec(function(err,logo){
            if(err) throw err;
            webTitle.exec(function(err,title){
                if(err) throw err;
                socialAccounts.exec(function(err,socialAccounts){
                    if(err) throw err;
                    committeeData.exec(function (err,committeedata) {
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
                        if (page > pages || page < 1) {
                            res.redirect('/commitee')
                        } else {
                            res.render('Index/commitee',{
                                committees:committeedata,
                                page:page,
                                pages:pages,
                                title: title,
                                logo: logo,
                                socialAccounts: socialAccounts
                            })
                        }
                    })
                })
            })
        })
    })
}
exports.upcoming_event= function(req,res){
    let upcomingEvents = Event.find({'eventType':'Upcoming'}).sort({'_id':-1}).limit(5);
    upcomingEvents.exec(function(err,eventValues){
        if(err) throw err;
        webTitle.exec(function(err,title){
            if(err) throw err;
            socialAccounts.exec(function(err,socialAccounts){
                if(err) throw err;
                logo.exec(function(err,logo){
                    res.render('Index/upcoming-event',{
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
                    res.render('Index/update-event',{
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
                    res.render('Index/event-single',{
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
