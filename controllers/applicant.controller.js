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
let companyLogoUpload = multer({storage:logoStorage}).single('companylogo');

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
let async = require('async');

//to get register page
exports.registerPage = function (req,res) {
    async.parallel({
        webTitle: function (callback) {
            webTitleQuery.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        socialAccountList: function(callback){
            socialAccountsQuery.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        logo: function(callback){
            logo.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,applicantPageData){
        if(err) throw err;
        res.render('Applicant/register',{
            title: applicantPageData.webTitle,
            socialAccounts: applicantPageData.socialAccountList,
            logo: applicantPageData.logo,
            page_name: 'Applicant-Register'
        })
    })
}



//to submit first form
exports.register_submit = async function (req,res,next) {
    upload(req,res,async function(err){
        const mobilenum = req.body.mobile;
        const image= req.file.filename;
        //var serialNum = Company.countDocuments().exec();
        //var totalSerialNum = Company.countDocuments().exec();
        //var serial=totalSerialNum+1;
        if(err) throw err;

        let ApplicantGeneralInfo = new Applicant_general_info();
        ApplicantGeneralInfo.mobile=req.body.mobile;
        ApplicantGeneralInfo.firstname=req.body.firstname;
        ApplicantGeneralInfo.middlename=req.body.middlename;
        ApplicantGeneralInfo.lastname=req.body.lastname;
        ApplicantGeneralInfo.fathersname=req.body.fathersname;
        ApplicantGeneralInfo.dob=req.body.dob;
        ApplicantGeneralInfo.blood_group=req.body.blood_group;
        ApplicantGeneralInfo.nationality=req.body.nationality;
        ApplicantGeneralInfo.gender=req.body.gender;
        ApplicantGeneralInfo.email=req.body.email;
        ApplicantGeneralInfo.url=req.body.url;
        ApplicantGeneralInfo.image=image;
        ApplicantGeneralInfo.approval='0';

        let ApplicantMailingAddress = new Applicant_mailing_address();
        ApplicantMailingAddress.mobile=req.body.mobile;
        ApplicantMailingAddress.city=req.body.city;
        ApplicantMailingAddress.state=req.body.state;
        ApplicantMailingAddress.address=req.body.address;
        ApplicantMailingAddress.postcode=req.body.postcode;
        ApplicantMailingAddress.approval='0';

        let ApplicantOfficeInfo = new Applicant_office_info();
        ApplicantOfficeInfo.applicantmobile=req.body.mobile;
        ApplicantOfficeInfo.officephone=req.body.officephn;
        ApplicantOfficeInfo.recidencephone=req.body.residencephn;
        ApplicantOfficeInfo.officefax=req.body.faxnum;
        ApplicantOfficeInfo.designation=req.body.designation;
        ApplicantOfficeInfo.organization=req.body.organization;
        ApplicantOfficeInfo.approval='0';

        let ApplicantPermanentAddress = new Applicant_permanent_address();
        ApplicantPermanentAddress.applicantmobile=req.body.mobile;
        ApplicantPermanentAddress.district=req.body.district;
        ApplicantPermanentAddress.upazila=req.body.upazila;
        ApplicantPermanentAddress.post_office=req.body.postoffice;
        ApplicantPermanentAddress.village=req.body.village;
        ApplicantPermanentAddress.road=req.body.road;
        ApplicantPermanentAddress.block=req.body.block;
        ApplicantPermanentAddress.house=req.body.house;
        ApplicantPermanentAddress.post_code=req.body.permanentpostcode;
        ApplicantPermanentAddress.approval='0';

        try{
            await ApplicantGeneralInfo.save();
            await ApplicantMailingAddress.save();
            await ApplicantOfficeInfo.save();
            await ApplicantPermanentAddress.save();
        }
        catch (error) {
            throw error;
        }
        async.parallel({
            webTitle: function(callback){
                webTitleQuery.exec()
                    .then((data)=>{
                        callback(null,data)
                    })
                    .catch((error)=>{
                        throw error;
                    })
            },
            logo: function (callback) {
                socialAccountsQuery.exec()
                    .then((data)=>{
                        callback(null,data)
                    })
                    .catch((error)=>{
                        throw error;
                    })

            },
            socialAccounts: function(callback){
                logo.exec()
                    .then((data)=>{
                        callback(null,data)
                    })
                    .catch((error)=>{
                        throw error;
                    })
            }
        },function (err,applicantData) {
            if(err) throw err;
            res.render('Applicant/register-form-1',{
                mobile:mobilenum,
                title: applicantData.webTitle,
                socialAccounts: applicantData.socialAccounts,
                logo: applicantData.logo,
                page_name: 'Applicant-Register'
            })
        })
        /*serialNum.exec(function (err,totalserial) {
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
        })*/
    })
}

//to submit applicant company information
exports.registerForm1Submit = async function (req,res) {
    companyLogoUpload(req,res,async function(err){
        if(err) throw err;
        const image=req.file.filename;
        const mobileid = req.body.primarymobile;
        //const serialnum = req.body.primaryserial;
        let company = new Company();
        company.applicantmobile=req.body.primarymobile;
        company.companyname=req.body.companyname;
        company.address1=req.body.companyaddress1;
        company.address2=req.body.companyaddress2;
        company.cellphone=req.body.cellphone;
        company.telephone=req.body.telephone;
        company.email=req.body.email;
        company.website=req.body.website;
        company.logo=image;
        company.approval='0';
        try{
            await company.save();
        }
        catch (error) {
            throw error;
        }
        async.parallel({
            webTitle: function(callback){
                webTitleQuery.exec()
                    .then((data)=>{
                        callback(null,data)
                    })
                    .catch((error)=>{
                        throw error;
                    })
            },
            logo: function (callback) {
                socialAccountsQuery.exec()
                    .then((data)=>{
                        callback(null,data)
                    })
                    .catch((error)=>{
                        throw error;
                    })

            },
            socialAccounts: function(callback){
                logo.exec()
                    .then((data)=>{
                        callback(null,data)
                    })
                    .catch((error)=>{
                        throw error;
                    })
            }
        },function (err,companyData) {
            if(err) throw err;
            res.render('Applicant/register-form-2',{
                mobile:mobileid,
                title: companyData.webTitle,
                socialAccounts: companyData.socialAccounts,
                logo: companyData.logo,
                page_name: 'Applicant-Register'
            })
        })
        /*let company = new Company({
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
        })*/
    })
}


//to submit if there is any previous membership
exports.registerForm2Submit = async function (req,res,next) {
    let membershipNo = req.body.membershipno;
    if(membershipNo ===''){
        res.send('Please Wait for our Confirmation!');
    }else{
        let applicant_membership = new Membership();
        applicant_membership.membershipno=req.body.membershipno;
        applicant_membership.mobile=req.body.mobile;
        //applicant_membership.serial=req.body.serial;
        try{
            await applicant_membership.save();
        }
        catch (error) {
            throw error;
        }
        res.send('Please Wait for our Confirmation!');
        /*let applicant_membership = new Membership({
            membershipno: req.body.membershipno,
            mobile: req.body.mobile,
            serial: req.body.serial
        })
        applicant_membership.save(function(err){
            if(err) throw err;
            res.send('Please Wait for our Confirmation!');
        })*/
    }
}

//to get member request list
exports.memberRequestList=function(req,res){
    let applicant_general_info = Applicant_general_info.find({"approval":"0"}).sort({'_id':-1}).select({
        "firstname":1,"middlename":1,"email":1,"url":1,"image":1,"mobile":1
    });
    let applicant_office_info = Applicant_office_info.find({"approval":"0"}).sort({'_id':-1}).select({
        "applicantmobile":1,"organization":1,"designation":1
    })

    async.parallel({
        generalInfo: function(callback){
            applicant_general_info.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        officeInfo: function(callback){
            applicant_office_info.exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,data){
        if(err) throw err;
        res.render('Applicant/applicant-request',{
            generalinfo:data.generalInfo,
            officeinfo: data.officeInfo,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage,
            page_name: 'Applicant'
        })
    })
    /*applicant_general_info.exec(function(err,general_info){
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
    })*/
}

//to get add new member page
exports.addNewMemberPage = function(req,res){
    sess = req.session;
    res.render('Applicant/addMember',{
        title: sess.title,
        username: sess.username,
        userimage: sess.userimage
    })
}

//to store member general information
exports.memberRegister1 = async function(req,res,next){
    sess = req.session;
    memberUpload(req,res,async function(err){
        const mobilenum = req.body.mobile;
        const image= req.file.filename;
        var serialNum = await Company.countDocuments().exec();
        var serial = serialNum+1;
        if(err) throw err;
        let ApplicantGeneralInfo = new Applicant_general_info();
        ApplicantGeneralInfo.serial=serial;
        ApplicantGeneralInfo.mobile=req.body.mobile;
        ApplicantGeneralInfo.firstname=req.body.firstname;
        ApplicantGeneralInfo.middlename=req.body.middlename;
        ApplicantGeneralInfo.lastname=req.body.lastname;
        ApplicantGeneralInfo.fathersname=req.body.fathersname;
        ApplicantGeneralInfo.dob=req.body.dob;
        ApplicantGeneralInfo.blood_group=req.body.blood_group;
        ApplicantGeneralInfo.nationality=req.body.nationality;
        ApplicantGeneralInfo.gender=req.body.gender;
        ApplicantGeneralInfo.email=req.body.email;
        ApplicantGeneralInfo.url=req.body.url;
        ApplicantGeneralInfo.image=image;
        ApplicantGeneralInfo.approval='0';

        let ApplicantMailingAddress = new Applicant_mailing_address();
        ApplicantMailingAddress.serial=serial;
        ApplicantMailingAddress.mobile=req.body.mobile;
        ApplicantMailingAddress.city=req.body.city;
        ApplicantMailingAddress.state=req.body.state;
        ApplicantMailingAddress.address=req.body.address;
        ApplicantMailingAddress.postcode=req.body.postcode;
        ApplicantMailingAddress.approval='0';

        let ApplicantOfficeInfo = new Applicant_office_info();
        ApplicantOfficeInfo.serial=serial;
        ApplicantOfficeInfo.applicantmobile=req.body.mobile;
        ApplicantOfficeInfo.officephone=req.body.officephn;
        ApplicantOfficeInfo.recidencephone=req.body.residencephn;
        ApplicantOfficeInfo.officefax=req.body.faxnum;
        ApplicantOfficeInfo.designation=req.body.designation;
        ApplicantOfficeInfo.organization=req.body.organization;
        ApplicantOfficeInfo.approval='0';

        let ApplicantPermanentAddress = new Applicant_permanent_address();
        ApplicantPermanentAddress.serial=serial;
        ApplicantPermanentAddress.applicantmobile=req.body.mobile;
        ApplicantPermanentAddress.district=req.body.district;
        ApplicantPermanentAddress.upazila=req.body.upazila;
        ApplicantPermanentAddress.post_office=req.body.postoffice;
        ApplicantPermanentAddress.village=req.body.village;
        ApplicantPermanentAddress.road=req.body.road;
        ApplicantPermanentAddress.block=req.body.block;
        ApplicantPermanentAddress.house=req.body.house;
        ApplicantPermanentAddress.post_code=req.body.permanentpostcode;
        ApplicantPermanentAddress.approval='0';
        try{
            await ApplicantGeneralInfo.save();
            await ApplicantMailingAddress.save();
            await ApplicantOfficeInfo.save();
            await ApplicantPermanentAddress.save();
        }
        catch (error) {
            throw error;
        }
        res.render('Applicant/member-register-1',{
            mobile:mobilenum,
            serial:serial,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
        /*serialNum.exec(function (err,totalserial) {
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
        })*/
    })
}

//to store company information
exports.memberRegister2 = async function(req,res){
    sess = req.session;
    companyLogoUpload(req,res,async function(err){
        if(err) throw err;
        const image=req.file.filename;
        const mobileid = req.body.primarymobile;
        const serialnum = req.body.primaryserial;
        let company = new Company();
        company.serial=serialnum;
        company.applicantmobile=req.body.primarymobile;
        company.companyname=req.body.companyname;
        company.address1=req.body.companyaddress1;
        company.address2=req.body.companyaddress2;
        company.cellphone=req.body.cellphone;
        company.telephone=req.body.telephone;
        company.email=req.body.email;
        company.website=req.body.website;
        company.logo=image;
        company.approval='0';
        try{
            await company.save();
        }
        catch (error) {
            throw error;
        }
        res.render('Applicant/member-register-2',{
            mobile:mobileid,
            serial:serialnum,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage
        })
        /*let company = new Company({
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
        })*/
    })

}

//to store if there is any membership
exports.registerComplete = async function(req,res,next){
    let membershipNo = req.body.membershipno;
    if(membershipNo ==''){
        res.send('New Member Added!');
    }else{
        let applicantMembership = new Membership();
        applicantMembership.membershipno=req.body.membershipno;
        applicantMembership.mobile=req.body.mobile;
        applicantMembership.serial=req.body.serial;

        try{
            await applicantMembership.save();
        }
        catch (error) {
            throw error;
        }
        res.send('New Member Added!');
        /*let applicant_membership = new Membership({
            membershipno: req.body.membershipno,
            mobile: req.body.mobile,
            serial: req.body.serial
        })
        applicant_membership.save(function(err){
            if(err) throw err;
            res.send('New Member Added!');
        })*/
    }
}


//to check an applicants full information
exports.memberFullInfo=function(req,res){
    var mobile = req.params.mobile;
    async.parallel({
        mailingAddress: function(callback){
            Applicant_mailing_address.find({'mobile': mobile}).exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        companyAddress: function(callback){
            Applicant_company_info.find({'applicantmobile': mobile}).exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        },
        permanentAddress: function(callback){
            Applicant_permanent_address.find({'applicantmobile':mobile}).exec()
                .then((data)=>{
                    callback(null,data)
                })
                .catch((error)=>{
                    throw error;
                })
        }
    },function(err,applicant){
        res.render('Applicant/member-full-info',{
            company_info:applicant.companyAddress,
            mailing_address:applicant.mailingAddress,
            permanentAddress: applicant.permanentAddress,
            title: sess.title,
            username: sess.username,
            userimage: sess.userimage,
            page_name: 'Applicant'
        })
    })
    /*Applicant_mailing_address.find({'mobile': mobile},function (err,mailing_address) {
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
    })*/
}


//to approve an applicant
exports.memberApprove=async function(req,res){
    let totalApplicant = await Applicant_general_info.find({'approval': '1'}).countDocuments().exec();
    var serial=totalApplicant+1;
    //console.log(serial)
    var mobile =req.params.mobile;
    let approval = req.body.approval;
    try{
        await Applicant_general_info.findOneAndUpdate({'mobile':mobile},
            {$set:{approval: '1', serial: serial}}).exec();
        await Applicant_office_info.findOneAndUpdate({'applicantmobile':mobile},
            {$set:{approval: '1', serial: serial}}).exec();
        await Applicant_mailing_address.findOneAndUpdate({'mobile':mobile},
            {$set:{approval: '1', serial: serial}}).exec();
        await Applicant_permanent_address.findOneAndUpdate({'applicantmobile':mobile},
            {$set:{approval: '1', serial: serial}}).exec();
        await Applicant_company_info.findOneAndUpdate({'applicantmobile':mobile},
            {$set:{approval: '1', serial: serial}}).exec();
        res.send('Member Approved!');

    }
    catch (error) {
        throw error;
    }


}

//to delete an applicant
exports.member_delete = async function(req,res,next){
    const fs = require('fs')
    let applicantImage =  await Applicant_general_info.find({'mobile':req.params.mobile}).select({'image': true}).exec();
    let companyImage =  await Applicant_company_info.find({'applicantmobile':req.params.mobile}).select({'logo': true});
    let applicantImageName;
    let companyLogoName;
    applicantImage.forEach(function (data) {
        applicantImageName=data.image;
    })
    companyImage.forEach(function (data) {
        companyLogoName=data.logo;
    })
    const applicantFilepath = `./public/uploads/applicants/${applicantImageName}`;
    const companyFilepath = `./public/uploads/companies/${companyLogoName}`;

    fs.unlink(companyFilepath, (err) => {
        if (err) {
            throw err;
        }
        fs.unlink(applicantFilepath, (err) => {
        if (err) {
            throw err;
        }

    })
    })


    try{
        await Applicant_general_info.findOneAndRemove({'mobile':req.params.mobile});
        await Applicant_mailing_address.findOneAndRemove({'mobile':req.params.mobile});
        await Applicant_office_info.findOneAndRemove({'applicantmobie':req.params.mobile});
        await Applicant_company_info.findOneAndRemove({'applicantmobile':req.params.mobile});
        await Applicant_permanent_address.findOneAndRemove({'applicantmobile':req.params.mobile});
        res.send('Member removed successfully!');
    }
    catch (error) {
        throw error;
    }

}
