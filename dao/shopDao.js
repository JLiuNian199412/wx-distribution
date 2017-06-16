var query=require('../conf/db.js');
function goodInfo(goodsId,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id And g.id=?',[goodsId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodInfo=goodInfo;

function deleteGood(goodId,callback){
    query('DELETE FROM goods WHERE id=?',[goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports. deleteGood= deleteGood;

function goodsInfo(good,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id ORDER BY '+good.sortBy+' '+ good.sortDirection+' LIMIT ?,?',[(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodsInfo=goodsInfo;

function goodsLike(userId,callback){
    query('select g.*,i.url from goods g,goodsimg i where g.picId=i.id AND type=(select type from goods where id=(select goodId from history where userId=? ORDER BY id DESC Limit 1)) LIMIT 0,4',[userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodsLike=goodsLike;

function goodTypeInfo(good,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id AND type=? AND detailType=?  ORDER BY id ASC LIMIT ?,?',[good.type,good.detailType,(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodTypeInfo=goodTypeInfo;

function goodTypeInfo2(good,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id AND type=? AND  sex=? ORDER BY id ASC LIMIT ?,?',[good.type,good.sex,(good.index-1)*good.account,good.account],function(qerr,vals,fields){
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

function goodsTYpeSort(good,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id AND g.type=? AND g.detailType=? ORDER BY '+good.sortBy+' '+ good.sortDirection+' LIMIT ?,?',[good.type,good.detailType(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodsTYpeSort=goodsTYpeSort;

function goodsSexSort(good,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id AND g.type=? AND g.sex=? ORDER BY '+good.sortBy+' '+ good.sortDirection+' LIMIT ?,?',[good.type,good.sex,(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.goodsSexSort=goodsSexSort;

function searchGoods(good,callback){
    query('select g.*,i.url FROM goods g,goodsimg i WHERE g.picId=i.id AND g.name like ? ORDER BY '+good.sortBy+' '+ good.sortDirection+' LIMIT ?,?',[good.content,(good.index-1)*good.account,good.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.searchGoods=searchGoods;

function insertShopcat(good,callback){
    query('INSERT INTO shopcart (goodsId,goodsQty,userId) VALUES (?,?,?)',[good.goodId,good.qty,good.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.insertShopcat=insertShopcat;

function befInsertShopcat(good,callback){
    query('select * FROM shopcart where goodsId=? AND userId=?',[good.goodId,good.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.befInsertShopcat=befInsertShopcat;

function updateShopcat(good,callback){
    query('UPDATE shopcart SET goodsQty=? WHERE goodsId=? AND userId=?',[good.qty,good.goodId,good.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updateShopcat=updateShopcat;

function countShopcat(good,callback){
    query('select count(*) total from shopcart where userId=?',[good.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.countShopcat=countShopcat;

function showShopcat(userId,callback){
    query('select g.id,g.name,g.price,g.qty,c.cartId,c.goodsQty,i.url from goods g,shopcart c,goodsimg i where g.id=c.goodsId AND g.picId=i.id AND c.userId=?',[userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showShopcat=showShopcat;

function deleteShopcat(cart,callback){
    query('DELETE FROM shopcart WHERE cartId=? AND userId=?',[cart.cartId,cart.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deleteShopcat=deleteShopcat;

function addPop(good,callback){
    query('UPDATE goods SET popularity=popularity+1 WHERE id=? ',[good.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.addPop=addPop;

function deletePop(good,callback){
    query('UPDATE goods SET popularity=popularity-1 WHERE id=? ',[good.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deletePop=deletePop;

function updateGood(good,callback){
    query('UPDATE goods SET qty=qty-?,sales=sales+? WHERE id=? ',[good.num,good.num,good.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updateGood=updateGood;

function insertGoods(good,callback){
    query('INSERT INTO goods (name,picId,price,qty,type,detailType,sex) VALUES (?,?,?,?,?,?,?)',[good.goodName,good.picId,good.goodPrice,good.goodQty,good.goodType,good.goodDetailType,good.sex],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.insertGoods=insertGoods;