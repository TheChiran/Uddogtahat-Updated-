let config = require('../config');


/*if(process.env === 'development'){
    dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`; //development mode url
}else if(process.env==='production'){
    dbURL = `mongodb+srv://uddogtahat:uddogtahat54321@cluster0-gsey2.mongodb.net/uddogtahat?retryWrites=true&w=majority`;
}*/
//let dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`; //development mode url
let dbURL = `mongodb+srv://uddogtahat:uddogtahat54321@cluster0-gsey2.mongodb.net/uddogtahat?retryWrites=true&w=majority`;
//let dbURL = `mongodb+srv://${process.env.DB_HOST}:${process.env.DB_PASS}@cluster0-gsey2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


module.exports=dbURL;
