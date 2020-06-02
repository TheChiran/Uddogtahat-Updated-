const Applicant_general_info = require('../model/applicant/applicant.general.info.model');

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
                    isNew: 'Yes',
                    page_name: 'Dashboard'
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
                    isNew: '',
                    page_name: 'Dashboard'
                })
            })
        })
    }

}
