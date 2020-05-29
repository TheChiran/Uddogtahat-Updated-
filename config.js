const config = {
    app:{
        port: 3000
    },
    db:{
        host:'localhost',
        port: 27017,
        name: 'uddogtahat'
    },
    dbProduction:{
        password: process.env.DB_PASS
    }
}

module.exports = config;
