/*=====================all controllers=====================*/

const Applicantgeneralinfo = require('../model/applicant/applicant.general.info.model');
const Applicant_mailing_address = require('../model/applicant/applicant.mailing.address.model');
const Applicant_office_info = require('../model/applicant/applicant.office.info.model');
const Applicant_permanent_address = require('../model/applicant/applicant.permanent.address.model');
const Company = require('../model/company/company.information.model');
const Membership = require('../model/applicant/applicant.membership.record.model');
const webtitle = require('../model/homePage/website.title.model');
const socialaccount = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
let webTitleQuery = webtitle.find().limit(1).sort({'_id':-1});
let socialAccountsQuery = socialaccount.find();

let logo = Logo.find().limit(1).sort({'_id':-1});
/*=====================all controllers=====================*/


/*====================File Upload=======================*/
var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');
let storage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/applicants');
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});
let upload = multer({storage:storage}).single('applicantimage');

let logoStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/companies');
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});
let logoUpload = multer({storage:logoStorage}).single('companylogo');
/*====================File Upload Ends=======================*/



exports.register = function (req,res) {
    webTitleQuery.exec(function(err,title){
        if(err) throw err;
        socialAccountsQuery.exec(function(err,socialAccounts){
            if(err) throw err;
            logo.exec(function(err,logo){
                if(err) throw err;
                res.render('Index/register',{
                    title: title,
                    socialAccounts: socialAccounts,
                    logo: logo
                })
            })
        })
    })
}
exports.register_submit = function (req,res) {
    upload(req,res,function(err){
        const mobilenum = req.body.mobile;
        const image= req.file.filename;
        var serialNum = Company.countDocuments();
        var serial;
        if(err) throw err;
        serialNum.exec(function (err,totalserial) {
            if(err) throw err;
            serial=totalserial+1;
            let ApplicantGeneralInfo = new Applicantgeneralinfo({
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
                approval: '0'
            });
            let ApplicantMailingAddress = new Applicant_mailing_address({
                serial:serial,
                mobile: req.body.mobile,
                city: req.body.city,
                state: req.body.state,
                road: req.body.address,
                postcode: req.body.postcode,
                approval: '0'
            });
            let ApplicantOfficeInfo = new Applicant_office_info({
                serial:serial,
                applicantmobile: req.body.mobile,
                officephone: req.body.officephn,
                recidencephone: req.body.residencephn,
                officefax: req.body.faxnum,
                designation: req.body.designation,
                organization: req.body.organization,
                approval: '0'
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
                approval: '0'
            });

            ApplicantGeneralInfo.save(function(err){
                if(err) throw err;
                ApplicantMailingAddress.save(function(err){
                    if(err) throw err;
                    ApplicantOfficeInfo.save(function(err){
                        if(err) throw err;
                        ApplicantPermanentAddress.save(function(err){
                            if(err) throw err;
                            webTitleQuery.exec(function(err,title){
                                if(err) throw err;
                                socialAccountsQuery.exec(function(err,socialAccounts){
                                    if(err) throw err;
                                    logo.exec(function(err,logo){
                                        if(err) throw err;
                                        res.render('Index/register-form-1',{
                                            mobile:mobilenum,
                                            serial:serial,
                                            title: title,
                                            socialAccounts: socialAccounts,
                                            logo: logo
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
}
exports.registerForm1_submit = function (req,res) {
    logoUpload(req,res,function(err){
        if(err) throw err;
        const image=req.file.filename;
        console.log(image);
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
            approval: '0'
        })
        company.save(function(err){
            if(err) throw err;
            webTitleQuery.exec(function(err,title){
                if(err) throw err;
                socialAccountsQuery.exec(function(err,socialAccounts){
                    if(err) throw err;
                    logo.exec(function(err,logo){
                        if(err) throw err;
                        res.render('Index/register-form-2',{
                            mobile:mobileid,
                            serial:serialnum,
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
exports.registerForm2_submit = function (req,res) {
    let membershipNo = req.body.membershipno;
    if(membershipNo ==''){
        res.send('Please Wait for our Confirmation!');
    }else{
        let applicant_membership = new Membership({
            membershipno: req.body.membershipno,
            mobile: req.body.mobile,
            serial: req.body.serial
        })
        applicant_membership.save(function(err){
            if(err) throw err;
            res.send('Please Wait for our Confirmation!');
        })
    }

}
