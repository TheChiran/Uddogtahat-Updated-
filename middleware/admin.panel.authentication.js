exports.auth = function(req,res,next){
    sess = req.session;
    if(!(sess.email && sess.username)){
        res.redirect('/admin/login');
    }else{
        return next();
    }
}
