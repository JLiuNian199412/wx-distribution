var query=require('../conf/db.js');
function login(callback){
    query('select * from user',function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}

exports.login=login;