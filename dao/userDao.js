var query=require('../conf/db.js');
function userInfo(user,callback){
    query('select * from user where openid=?',[user.openid],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.userInfo=userInfo;

function insert(user,callback){
    query('INSERT INTO user (name,openid,type,usericon) VALUES (?,?,"会员",?)',[user.nickname,user.openid,user.headimgurl],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    })
}


exports.insert=insert;