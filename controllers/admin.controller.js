const Gallary = require('../model/gallary/gallary.model');
const Category =  require('../model/activities/category.model');
const Activity = require('../model/activities/activities.model');
const Applicant_general_info = require('../model/applicant/applicant.general.info.model');
const Applicant_office_info = require('../model/applicant/applicant.office.info.model');
const Applicant_mailing_address = require('../model/applicant/applicant.mailing.address.model');
const Applicant_permanent_address = require('../model/applicant/applicant.permanent.address.model');
const Applicant_company_info = require('../model/company/company.information.model');
const About = require('../model/about/about.page.model');
const Committee = require('../model/committee/committee.model');
const ContactPage = require('../model/contact/contact.page.model');
const Event = require('../model/events/events.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
const Quote = require('../model/homePage/quotes.model');
const HomePageAboutSectionSkills = require('../model/homePage/about.section.skills.model');
const HomePageAboutSectionContents = require('../model/homePage/about.section.contents.model');
const AboutContentBackground = require('../model/homePage/about.section.background.model');
const EventSectionBackground = require('../model/homePage/eventSectionBackground.model');
const WebsiteTitle = require('../model/homePage/website.title.model');
const HomePageSlider = require('../model/homePage/slider.section.model');
const ActivityPageHeader = require('../model/activities/activities.header.model');
const Admin = require('../model/admin/admin.model');
const Membership = require('../model/applicant/applicant.membership.record.model');
const Company = require('../model/company/company.information.model');


let webtitle = WebsiteTitle.find().limit(1).sort({'_id':-1});

/*File upload*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');
let storage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/gallary')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let upload = multer({storage:storage}).single('eventpicture');
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

let aboutstorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/about')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadAbout = multer({storage:aboutstorage}).single('aboutpicture');

let committeestorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/committee')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadCommittee = multer({storage:committeestorage}).single('committeepersonimage');

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

let socialAccountStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/socialAccounts')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadSocialAccount = multer({storage:socialAccountStorage}).single('socialAccountIcon');

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

let adminProfilePictureStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/admin')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let adminProfilePictureUpload = multer({storage:adminProfilePictureStorage}).single('adminProfilePicture');

let memberPictureStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/applicants')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let memberUpload = multer({storage:memberPictureStorage}).single('applicantimage');

let companylogoStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/companies')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let companylogoUpload = multer({storage:companylogoStorage}).single('companylogo');


let bcrypt = require('bcryptjs');
/*File upload*/
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'uddogtahat54412';

exports.login = function(req,res){
    res.render('admin/login/login')
}
exports.loginPost = function(req,res){
    sess = req.session;
    let email = req.body.email;
    let password = req.body.password;
    let adminEmailQuery = Admin.find({$or:[{'email': email},{'username': email}]}).select({"email":1,"username":1,"image":1,"password":1});
    //let adminPasswordQuery = Admin.find({'password': password}).select({"password":1});
    adminEmailQuery.exec(function(err,adminEmail){
        if(err) throw err;
        if(adminEmail.length > 0){
            bcrypt.compare(req.body.password,adminEmail[0].password,function(err,response){
                if(err){
                    res.send('Password Or Email did not match!');
                }
                if(response){
                    webtitle.exec(function(err,title){
                        if(err) throw err;
                        if(title.length > 0){
                            sess.title = title[0].title;
                        }else{
                            sess.title = '';
                        }
                        sess.email = adminEmail[0].email;
                        sess.username = adminEmail[0].username;
                        //sess.title = title[0].title;
                        sess.userimage = adminEmail[0].image;
                        res.send(true);
                    })
                }
                if(!response){
                    res.send('Wrong Password Or Email! Please Try Again!');
                }
            })
            /*adminPasswordQuery.exec(function(err,adminPassword){
                if(err) throw err;
                if(adminPassword.length > 0){
                    bcrypt.compare(req.body.password,adminPassword[0].password,function(err,res){
                        if(err){
                            res.send('Password did not match!');
                        }
                        if(res){
                            webtitle.exec(function(err,title){
                                if(err) throw err;
                                if(title.length > 0){
                                    sess.title = title[0].title;
                                }else{
                                    sess.title = '';
                                }
                                sess.email = adminEmail[0].email;
                                sess.username = adminEmail[0].username;
                                //sess.title = title[0].title;
                                sess.userimage = adminEmail[0].image;
                                res.send(true);
                            })
                        }
                    })
                }else{
                    res.send('Wrong password');
                }
            })*/
        }else{
            if(email =='uddogtahat@gmail.com' || email =='uddogtahat'){
                if(password == 'uddogtahat54321'){
                    sess.email = 'uddogtahat@gmail.com';
                    sess.username = 'uddogtahat';
                    sess.title = '';
                    sess.userimage = 'person.png';
                    sess.isNew = 'True';
                    res.send(true);
                }else{
                    res.send('Wrong Password');
                }
            }else{
                res.send('Wrong Email Or User name');
            }
        }
    })
}
exports.dashboard = function(req,res,next){
    sess = req.session;

    let totalMembersQuery = Applicant_general_info.countDocuments({"approval":"1"});
    let totalMemberRequestQuery = Applicant_general_info.countDocuments({"approval":"0"});

    if(sess.isNew){
        totalMembersQuery.exec(function(err,totalMembers){
            if(err) throw err;
            totalMemberRequestQuery.exec(function(err,totalRequests){
                if(err) throw err;
                res.render('admin/dashboard/dashboard',{
                    title: sess.title,
                    username: sess.username,
                    userimage: sess.userimage,
                    totalMembers: totalMembers,
                    totalRequests: totalRequests,
                    isNew: 'Yes'
                })
            })
        })
    }else{
        totalMembersQuery.exec(function(err,totalMembers){
            if(err) throw err;
            totalMemberRequestQuery.exec(function(err,totalRequests){
                if(err) throw err;
                res.render('admin/dashboard/dashboard',{
                    title: sess.title,
                    username: sess.username,
                    userimage: sess.userimage,
                    totalMembers: totalMembers,
                    totalRequests: totalRequests,
                    isNew: ''
                })
            })
        })
    }

}
exports.gallary = function(req,res){
    res.render('admin/dashboard/gallary',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.gallary_post = function(req,res){
    let totalGallarySerial = Gallary.countDocuments();
    var serial;
    upload(req,res,function(err){
        totalGallarySerial.exec(function(err,serialCounter){
            if(err) throw err;
            serial=serialCounter+1;
            let gallary = new Gallary({
                eventname: req.body.eventname,
                image: req.file.filename,
                serial:serial
            })
            gallary.save(function(err){
                if(err) throw err;
                res.end("File is uploaded!");
            })
        })

    })
    //res.render('admin/dashboard/gallary')
}
exports.activities = function(req,res){
    Category.find({},function(err,categories){
        res.render('admin/dashboard/activities',{
            categories: categories,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
    })
}
exports.activities_post = function(req,res){
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
    res.render('admin/dashboard/category',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.category_post = function(req,res){
    let category = new Category({
        name: req.body.blogCategory
    })
    category.save(function(err){
        if(err) throw err;
        res.send('New Category Created!');
    })
}
exports.member_requests=function(req,res){
    let applicant_general_info = Applicant_general_info.find({"approval":"0"}).sort({'_id':-1}).select({
        "firstname":1,"middlename":1,"email":1,"url":1,"image":1,"mobile":1
    });
    let applicant_office_info = Applicant_office_info.find({"approval":"0"}).sort({'_id':-1}).select({
        "applicantmobile":1,"organization":1,"designation":1
    })
    applicant_general_info.exec(function(err,general_info){
        if(err) throw err;
        applicant_office_info.exec(function(err,office_info){
            if(err) throw err;
            res.render('admin/dashboard/member-request',{
                generalinfo:general_info,
                officeinfo: office_info,
                title: sess.title,
                username: sess.username,
                userimage: sess.userimage
            })
        })
    })
}
exports.add_new_member = function(req,res){
    sess = req.session;
    res.render('admin/dashboard/addMember',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.member_register_1 = function(req,res){
    sess = req.session;
    memberUpload(req,res,function(err){
        const mobilenum = req.body.mobile;
        const image= req.file.filename;
        var serialNum = Company.countDocuments();
        var serial;
        if(err) throw err;
        serialNum.exec(function (err,totalserial) {
            if(err) throw err;
            serial=totalserial+1;
            let ApplicantGeneralInfo = new Applicant_general_info({
                serial:serial,
                mobile:req.body.mobile,
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                fathersname: req.body.fathersname,
                dob: req.body.dob,
                blood_group: req.body.blood_group,
                nationality: req.body.nationality,
                gender: req.body.gender,
                email: req.body.email,
                url:  req.body.url,
                image:image,
                approval: '1'
            });
            let ApplicantMailingAddress = new Applicant_mailing_address({
                serial:serial,
                mobile: req.body.mobile,
                city: req.body.city,
                state: req.body.state,
                road: req.body.address,
                postcode: req.body.postcode,
                approval: '1'
            });
            let ApplicantOfficeInfo = new Applicant_office_info({
                serial:serial,
                applicantmobile: req.body.mobile,
                officephone: req.body.officephn,
                recidencephone: req.body.residencephn,
                officefax: req.body.faxnum,
                designation: req.body.designation,
                organization: req.body.organization,
                approval: '1'
            });
            let ApplicantPermanentAddress = new Applicant_permanent_address({
                serial:serial,
                applicantmobile: req.body.mobile,
                district: req.body.district,
                upazila: req.body.upazila,
                post_office: req.body.postoffice,
                village: req.body.village,
                road: req.body.road,
                block: req.body.block,
                house: req.body.house,
                post_code: req.body.permanentpostcode,
                approval: '1'
            });

            ApplicantGeneralInfo.save(function(err){
                if(err) throw err;
                ApplicantMailingAddress.save(function(err){
                    if(err) throw err;
                    ApplicantOfficeInfo.save(function(err){
                        if(err) throw err;
                        ApplicantPermanentAddress.save(function(err){
                            if(err) throw err;
                            res.render('admin/dashboard/member-register-1',{
                                mobile:mobilenum,
                                serial:serial,
                                title: sess.title,
                                username: sess.username,
                                userimage: sess.userimage
                            })
                        })
                    })
                })
            })
        })
    })
}
exports.member_register_2 = function(req,res){
    sess = req.session;
    companylogoUpload(req,res,function(err){
        if(err) throw err;
        const image=req.file.filename;
        const mobileid = req.body.primarymobile;
        const serialnum = req.body.primaryserial;
        let company = new Company({
            serial:serialnum,
            applicantmobile: req.body.primarymobile,
            companyname: req.body.companyname,
            address1: req.body.companyaddress1,
            address2: req.body.companyaddress2,
            cellphone: req.body.cellphone,
            telephone: req.body.telephone,
            email: req.body.email,
            website: req.body.website,
            logo: image,
            approval: '1'
        })
        company.save(function(err){
            if(err) throw err;
            res.render('admin/dashboard/member-register-2',{
                mobile:mobileid,
                serial:serialnum,
                title: sess.title,
                username: sess.username,
                userimage: sess.userimage
            })
        })
    })
}
exports.register_complete = function(req,res){
    let membershipNo = req.body.membershipno;
    if(membershipNo ==''){
        res.send('New Member Added!');
    }else{
        let applicant_membership = new Membership({
            membershipno: req.body.membershipno,
            mobile: req.body.mobile,
            serial: req.body.serial
        })
        applicant_membership.save(function(err){
            if(err) throw err;
            res.send('New Member Added!');
        })
    }
}
exports.member_full_info=function(req,res){
    var mobile = req.params.mobile;
    Applicant_mailing_address.find({'mobile': mobile},function (err,mailing_address) {
        if(err) throw err;
        Applicant_company_info.find({'applicantmobile': mobile},function(err,company_info){
            if(err) throw err;
            Applicant_permanent_address.find({'applicantmobile':mobile},function(err,permanentAddress){
                if(err) throw err;
                res.render('admin/dashboard/member-full-info',{
                    company_info:company_info,
                    mailing_address:mailing_address,
                    permanentAddress: permanentAddress,
                    title: sess.title,
                    username: sess.username,
                    userimage: sess.userimage
                })
            })
        })
    })
}
exports.member_approve=function(req,res){
    let countApplicants = Applicant_general_info.countDocuments();
    countApplicants.exec(function(err,totalCount){
        if(err) throw err;
        var serial=totalCount;
        var mobile =req.params.mobile;
        Applicant_general_info.updateOne({'mobile':mobile},
            {
                $set:{
                    approval: req.body.approval,
                    serial: serial
                }
            }
            ,function(err){
                if(err) throw err;
                Applicant_office_info.updateOne({'applicantmobile':mobile},
                    {
                        $set:{
                            approval: req.body.approval,
                            serial: serial
                        }
                    }
                    ,function(err){
                        if(err) throw err;
                        Applicant_mailing_address.updateOne({'mobile':mobile},
                            {
                                $set:{
                                    approval: req.body.approval,
                                    serial: serial
                                }
                            }
                            ,function(err){
                                if(err) throw err;
                                Applicant_permanent_address.updateOne({'applicantmobile':mobile},
                                    {
                                        $set:{
                                            approval: req.body.approval,
                                            serial: serial
                                        }
                                    }
                                    ,function(err){
                                        if(err) throw err;
                                        Applicant_company_info.updateOne({'applicantmobile':mobile},
                                            {
                                                $set:{
                                                    approval: req.body.approval,
                                                    serial: serial
                                                }
                                            }
                                            ,function(err){
                                                if(err) throw err;
                                                res.send('Approved!');
                                            })
                                    })
                            })
                    })
            })
    })
}
exports.member_delete = function(req,res){
    //console.log(req.params.mobile);
    //res.send("Deleted succesfully!");
    Applicant_general_info.findOneAndRemove({'mobile':req.params.mobile},function(err){
        if(err) throw err;
        Applicant_mailing_address.findOneAndRemove({'mobile':req.params.mobile},function(err){
            if(err) throw err;
            Applicant_office_info.findOneAndRemove({'applicantmobie': req.params.mobile},function(err){
                if(err) throw err;
                Applicant_company_info.findOneAndRemove({'applicantmobile': req.params.mobile},function(err){
                    if(err) throw err;
                    Applicant_permanent_address.findOneAndRemove({'applicantmobile': req.params.mobile},function(err){
                        if(err) throw err;
                        res.send('Information removed succesfully!')
                    })
                })
            })
        })
    })
}
exports.contact_page=function(req,res){
    res.render('admin/dashboard/contact-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.contact_page_post=function(req,res){
    ContactPage.create(req.body,function(err){
        if(err) throw err;
        res.send('Contact details submitted!')
    })
}
exports.event_page=function(req,res){
    res.render('admin/dashboard/event',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    });
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
exports.committee_page=function(req,res){
    res.render('admin/dashboard/committee-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.committee_page_post=function(req,res){
    var totalCommitteeDocument = Committee.countDocuments();
    totalCommitteeDocument.exec(function(err,totalCommittee){
        if(err) throw err;
        var serial = totalCommittee+1;
        uploadCommittee(req,res,function(err){
            if(err) throw err;
            console.log(serial);
            let committee= new Committee({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                designation: req.body.designation,
                companyname: req.body.company,
                serial: serial,
                image: req.file.filename
            })
            committee.save(function(err){
                if(err) throw err;
                res.send('New Committee member Added!');
            })
        })
    })
    //res.render('admin/dashboard/committee-page')
}
exports.about_page=function(req,res){
    res.render('admin/dashboard/about-page',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.about_page_post=function(req,res){
    uploadAbout(req,res,function(err){
        if(err) throw err;
        let about = new About({
            contents: req.body.aboutContents,
            image: req.file.filename,
        })
        about.save(function(err){
            if(err) throw err;
            res.send('Contents Inserted!');
        })

    })
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
        res.render('admin/dashboard/manage-events',{
            events: eventDatas,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
    })
}
exports.social_accounts = function(req,res){
    res.render('admin/dashboard/social-accounts',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.social_accounts_post = function(req,res){
    uploadSocialAccount(req,res,function(err){
            if(err) throw err;
            let social = new Social({
            link: req.body.socialAccountLink,
            icon: req.file.filename,
            })
            social.save(function(err){
                if(err) throw err;
                res.end("Social Account Added");
            })

    })

}
exports.logo_upload_get=function(req,res){
    res.render('admin/dashboard/logoinput',{
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
    res.render('admin/dashboard/quotes',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.quotes_post = function(req,res){
    uploadQuote(req,res,function(err){
        if(err) throw err;
        let quote = new Quote({
            quote: req.body.quote,
            image: req.file.filename
        });
        quote.save(function(err){
            if(err) throw err;
            res.send('Quote uploaded!')
        })
    })
}
exports.get_about_home_page = function(req,res){
    res.render('admin/dashboard/homePageAboutSection',{
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
        let aboutBackground = new AboutContentBackground({
            image: req.file.filename
        });
        aboutBackground.save(function(err){
            if(err) throw err;
            //res.send('Background added succesfully!');
            res.redirect('/admin/home-page-about')
        })
    })
}
exports.home_page_event = function(req,res){
    res.render('admin/dashboard/home-page-event-background',{
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
exports.website_title_post = function(req,res){
    sess = req.session;
    let webtitle = new WebsiteTitle({
        title: req.body.title
    });
    webtitle.save(function(err){
        if(err) throw err;
        sess.title = req.body.title;
        res.send('Website Title Changed!');
    })
}
exports.homePageSlider = function(req,res){
    res.render('admin/dashboard/homePageSlider',{
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
exports.activityPageHeader = function(req,res){
    res.render('admin/dashboard/activityPageHeader',{
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
exports.adminSettings = function(req,res){
    sess = req.session;
    res.render('admin/settings/setting',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}
exports.changeUserName = function(req,res){
    sess = req.session;
    let adminQuery = Admin.findOneAndUpdate({'email':sess.email},{
        $set:{
            username: req.body.userName
        }
    })
    adminQuery.exec(function(err){
        if(err) throw err;
        sess.username = req.body.userName;
        res.send('User Name Changed!');
    })
}
exports.changeUserPassword = function(req,res){
    sess = req.session;
    let oldpassword = req.body.oldPassword;
    let adminOldPassword = Admin.find().limit(1);

    adminOldPassword.exec(function(err,oldPass){
        if(err) throw err;
        bcrypt.compare(oldpassword,oldPass[0].password,function (err,response) {
            if(err){
                res.send('Password Did Not Match with the previous one! Please Try Again!');
            }
            if(response){
                bcrypt.hash(req.body.newPassword,10,function(err,hash){
                    if(err) throw err;
                    let adminPasswordQuery = Admin.findOneAndUpdate({'email':sess.email},{
                        $set:{
                            password: hash
                        }
                    })
                    adminPasswordQuery.exec(function(err){
                        if(err) throw err;
                        res.send(true);
                    })
                })
            }
            if(!response){
                res.send('Password Did Not Match with the previous one! Please Try Again!');
            }

        })
        /*if(oldpassword === oldPass[0].password){


        }else{
            res.send('You Old Password Did not matched!');
        }*/
    })

}
exports.changeUserProfilePicture = function(req,res){
    sess = req.session;
    adminProfilePictureUpload(req,res,function(err){
        if(err) throw err;
        let adminProfilePictureQuery = Admin.findOneAndUpdate({'email':sess.email},{
            $set:{
                image: req.file.filename
            }
        })
        adminProfilePictureQuery.exec(function(err){
            if(err) throw err;
            sess.userimage = req.file.filename;
            res.send('Profile Picture Changed!');
        })
    })
}
exports.setNewUser = function(req,res){
    sess = req.session;
    adminProfilePictureUpload(req,res,function(err){
        if(err) throw err;
        let userEmail = req.body.userEmail;
        let userName = req.body.userName;
        let userPassword = req.body.userPassword;
        bcrypt.hash(userPassword,10,function(err,hash){
            if(!err){
                let newAdmin = new Admin({
                    username:req.body.userName,
                    email:req.body.userEmail,
                    password:hash,
                    image: req.file.filename
                });
                newAdmin.save(function(err){
                    if(err) throw err;
                    res.redirect('/admin/logout');
                })
            }
        })

    })
}

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/admin/login');
}




