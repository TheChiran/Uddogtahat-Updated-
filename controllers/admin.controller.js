const Applicant_general_info = require('../model/applicant/applicant.general.info.model');
const Applicant_office_info = require('../model/applicant/applicant.office.info.model');
const Applicant_mailing_address = require('../model/applicant/applicant.mailing.address.model');
const Applicant_permanent_address = require('../model/applicant/applicant.permanent.address.model');
const Applicant_company_info = require('../model/company/company.information.model');
const About = require('../model/about/about.page.model');
const Committee = require('../model/committee/committee.model');

const Event = require('../model/events/events.model');
//const Social = require('../model/social-accounts/social_account.model');
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
let bcrypt = require('bcryptjs');

/*let committeestorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/committee')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let uploadCommittee = multer({storage:committeestorage}).single('committeepersonimage');*/



/*let memberPictureStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/applicants')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let memberUpload = multer({storage:memberPictureStorage}).single('applicantimage');*/

/*let companylogoStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/companies')
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let companylogoUpload = multer({storage:companylogoStorage}).single('companylogo');*/



/*File upload*/
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'uddogtahat54412';



exports.dashboard = function(req,res,next){
    sess = req.session;

    let totalMembersQuery = Applicant_general_info.countDocuments({"approval":"1"});
    let totalMemberRequestQuery = Applicant_general_info.countDocuments({"approval":"0"});

    if(sess.isNew){
        totalMembersQuery.exec(function(err,totalMembers){
            if(err) throw err;
            totalMemberRequestQuery.exec(function(err,totalRequests){
                if(err) throw err;
                res.render('Dashboard/dashboard',{
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
                res.render('Dashboard/dashboard',{
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






