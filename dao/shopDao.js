var query=require('../conf/db.js');
function goodInfo(goodsId,callback){
    query('select * from goods where id=?',[goodsId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodInfo=goodInfo;

function goodsInfo(good,callback){
    query('select * FROM goods ORDER BY '+good.sortBy+' '+ good.sortDirection+' LIMIT ?,?',[(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodsInfo=goodsInfo;

function goodsLike(user,callback){
    query('select * from goods where type=(select type from goods where id=(select goodId from history where userId=?)) LIMIT 0,4',[user.id],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodsLike=goodsLike;

function goodTypeInfo(good,callback){
    query('select * from goods where type=? AND detailType=?  ORDER BY id ASC LIMIT ?,?',[good.type,good.detailType,(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodTypeInfo=goodTypeInfo;

function goodTypeInfo2(good,callback){
    query('select * from goods where type=? AND  sex=? ORDER BY id ASC LIMIT ?,?',[good.type,good.sex,(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodTypeInfo2=goodTypeInfo2;

function goodImg(imgId,callback){
    query('select url from goodsimg where id=? ',[imgId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodImg=goodImg;