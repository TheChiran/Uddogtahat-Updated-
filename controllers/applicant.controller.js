/*=====================all controllers=====================*/

const Applicant_general_info = require('../model/applicant/applicant.general.info.model');
const Applicant_mailing_address = require('../model/applicant/applicant.mailing.address.model');
const Applicant_office_info = require('../model/applicant/applicant.office.info.model');
const Applicant_company_info = require('../model/company/company.information.model');
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

let applicantStorage = multer.diskStorage({
    destination:function (req,file,callback) {
        callback(null,'./public/uploads/applicants');
    },
    filename:function (req,file,callback) {
        crypto.pseudoRandomBytes(16,function(err,raw){
            callback(null,raw.toString('hex')+Date.now()+'.'+fileExtension(file.mimetype));
        });
    }
});

let upload = multer({storage:applicantStorage}).single('applicantimage');

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

/*====================File Upload Ends=======================*/
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


exports.register = function (req,res) {
    webTitleQuery.exec(function(err,title){
        if(err) throw err;
        socialAccountsQuery.exec(function(err,socialAccounts){
            if(err) throw err;
            logo.exec(function(err,logo){
                if(err) throw err;
                res.render('Applicant/register',{
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
                                        res.render('Applicant/register-form-1',{
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
                        res.render('Applicant/register-form-2',{
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
            res.render('Applicant/applicant-request',{
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
    res.render('Applicant/addMember',{
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
                            res.render('Applicant/member-register-1',{
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
            res.render('Applicant/member-register-2',{
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
                res.render('Applicant/member-full-info',{
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
                        res.send('Information removed successfully!')
                    })
                })
            })
        })
    })
}
