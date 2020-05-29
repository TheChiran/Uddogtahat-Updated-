const Company = require('../model/company/company.information.model');
const WebsiteTitle = require('../model/homePage/website.title.model');
const Social = require('../model/social-accounts/social_account.model');
const Logo = require('../model/homePage/logo.model');
let webTitle = WebsiteTitle.find().limit(1).sort({'_id':-1});
let socialAccounts = Social.find();
let logo = Logo.find().limit(1).sort({'_id':-1});


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
                        res.render('Member/members',{
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
                            //alert('No More Pages')
                            res.redirect('/member/list')
                        } else {
                            res.render('Member/members',{
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
