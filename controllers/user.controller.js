const Admin = require('../model/admin/admin.model');
const Applicant_general_info = require('../model/applicant/applicant.general.info.model');
const WebsiteTitle = require('../model/homePage/website.title.model');
let webtitle = WebsiteTitle.find().limit(1).sort({'_id':-1});

var multer = require('multer');
var crypto=require('crypto');
var fileExtension = require('file-extension');
let bcrypt = require('bcryptjs');

/*File upload*/
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

exports.sign_in = function(req,res){
    res.render('User/sign-in')
}

exports.sign_in_post = function(req,res){
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

exports.setNewUser = function(req,res){
    sess = req.session;
    adminProfilePictureUpload(req,res,function(err){
        if(err) throw err;
        /*let userEmail = req.body.userEmail;
        let userName = req.body.userName;*/
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

exports.settings = function(req,res){
    sess = req.session;
    res.render('settings/setting',{
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
    let oldPassword = req.body.oldPassword;
    let adminOldPassword = Admin.find().limit(1);


    adminOldPassword.exec(function(err,oldPass){
        if(err) throw err;
        //console.log(oldPass[0].password);
        //console.log(oldPassword);
        bcrypt.compare(oldPassword,oldPass[0].password,function (err,response) {
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

exports.logout = function(req,res){
    req.session.destroy();
    res.redirect('/user/sign-in');
}
