var query=require('../conf/db.js');
function userInfo(user,callback){
    query('select * from user where openId=?',[user.openid],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.userInfo=userInfo;

function insert(user,callback){
    query('INSERT INTO user (name,openId,type,userIcon) VALUES (?,?,"会员",?)',[user.nickname,user.openid,user.headimgurl],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    })
}
exports.insert=insert;

function getUserInfo(user,callback){
    query('select * from user where id=?',[user.id],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.getUserInfo=getUserInfo;

function updatePrevId(user,callback){
    query('UPDATE user SET superior=? WHERE id=?',[user.prevId,user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updatePrevId=updatePrevId;

function updateUserInfo(user,callback){
    query('UPDATE user SET email=? WHERE id=?',[user.email,user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updateUserInfo=updateUserInfo;


function showSearch(userId,callback){
    query('SELECT content from search WHERE userId=?',[userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showSearch=showSearch;

function selectSearch(user,callback){
    query('SELECT content from search WHERE userId=? AND content=?',[user.userId,user.text],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.selectSearch=selectSearch;

function insertSearch(user,callback){
    query('INSERT INTO search (userId,content) VALUES (?,?)',[user.userId,user.text],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.insertSearch=insertSearch;

function deleteSearch(userId,callback){
    query('DELETE FROM search WHERE userId=?',[userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deleteSearch=deleteSearch;

function addCollection(user,callback){
    query('INSERT INTO collection (userId,goodsId) VALUES (?,?)',[user.userId,user.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.addCollection=addCollection;

function deleteCollection(user,callback){
    query('DELETE FROM collection WHERE userId=? AND goodsId',[user.userId,user.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deleteCollection=deleteCollection;

function showCollection(user,callback){
    query('SELECT * FROM collection WHERE userId=? AND goodsId=?',[user.userId,user.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showCollection=showCollection;

function countCollection(user,callback){
    query('select count(*) total from collection where userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.countCollection=countCollection;

function showCollections(user,callback){
    query('select g.*,i.url,c.id as collectionId from goods g,collection c,goodsimg i where g.id=c.goodsId AND g.picId=i.id AND c.userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showCollections=showCollections;

function countHistory(user,callback){
    query('select count(*) total from history where userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.countHistory=countHistory;

function addHistory(user,callback){
    query('INSERT INTO history (userId,goodId) VALUES (?,?)',[user.userId,user.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.addHistory=addHistory;

function searchHistory(user,callback){
    query('select * from history where userId=? AND goodId=?',[user.userId,user.goodId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.searchHistory=searchHistory;

function deleteHistory(user,callback){
    query('DELETE FROM history WHERE id=min(id) AND userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deleteHistory=deleteHistory;

function deleteAllHistory(user,callback){
    query('DELETE FROM history WHERE  userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deleteAllHistory=deleteAllHistory;

function showHistory(user,callback){
    query('select g.*,i.url from goods g,goodsimg i,history h where g.picId=i.id AND h.goodId=g.id AND userId=? order by h.id limit 6',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showHistory=showHistory;

function addAddress(user,callback){
    query('UPDATE address SET selects=-1 WHERE userId=?',[user.userId],function(qerr,vals2,fields){
        if(qerr){
            console.log(qerr)
        }
        query('INSERT INTO address (userId,name,phone,province,city,district,detail,selects) VALUES (?,?,?,?,?,?,?,1)',[user.userId,user.name,user.phone,user.province,user.city,user.district,user.detail],function(qerr,vals,fields){
            if(qerr){
                console.log(qerr)
            }
            callback(vals)
        });
    });

}
exports.addAddress=addAddress;

function setDefaultAddress(user,callback){
    query('UPDATE address SET selects=-1 WHERE userId=?',[user.userId],function(qerr,vals2,fields){
        if(qerr){
            console.log(qerr)
        }
        query('UPDATE address SET selects=1 WHERE userId=? AND addressId=?',[user.userId,user.addressId],function(qerr,vals,fields){
            if(qerr){
                console.log(qerr)
            }
            callback(vals)
        });
    });

}
exports.setDefaultAddress=setDefaultAddress;

function getDefaultAddress(user,callback){
    query('select * from address where userId=? AND selects=1',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });

}
exports.getDefaultAddress=getDefaultAddress;

function deleteAddress(address,callback){
    query('DELETE FROM address WHERE  userId=? AND addressId=?',[address.userId,address.addressId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.deleteAddress=deleteAddress;

function showAddressList(user,callback){
    query('select * from address where userId=? order by addressId DESC',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showAddressList=showAddressList;

function updateAddressDetail(address,callback){
    query('UPDATE address SET name=?,phone=?,province=?,city=?,district=?,detail=? WHERE addressId=?',[address.name,address.phone,address.province,address.city,address.district,address.detail,address.addressId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updateAddressDetail=updateAddressDetail;


function showAddressDetail(user,callback){
    query('select * from address where userId=? AND addressId=? ',[user.userId,user.addressId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showAddressDetail=showAddressDetail;

function searchStore(user,callback){
    query('select * from distributor d,user u where d.userId=u.id AND d.userId=? ',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.searchStore=searchStore;

function newStore(user,callback){
    query('INSERT INTO distributor (userId,name,userName,phone,qq,createTime) VALUES (?,?,?,?,?,?)',[user.userId,user.name,user.userName,user.phone,user.qq,user.time],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.newStore=newStore;

function updateGoodType(user,callback){
    query('UPDATE distributor SET goodsType=? WHERE userId=?',[user.goodsType,user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updateGoodType=updateGoodType;

function getGoodType(user,callback){
    query('select goodsType from distributor WHERE userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.getGoodType=getGoodType;

function insertOrder(order,callback){
    query('INSERT INTO orders (userId,orderNo,addressId,goods,numbers,price,status,time,img) VALUES (?,?,?,?,?,?,?,?,?)',[order.userId,order.orderNo,order.addressId,order.goods,order.num,order.price,order.status,order.time,order.img],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.insertOrder=insertOrder;

function orderList(user,callback){
    query('select * from orders WHERE userId=?',[user.userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.orderList=orderList;

function getOrderList(order,callback){
    query('select * FROM orders   ORDER BY '+order.sortBy+' '+ order.sortDirection+' LIMIT ?,?',[(order.index-1)*order.account,order.account],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.getOrderList=getOrderList;

function getOrderDetail(order,callback){
    query('select o.*,a.name,a.phone,a.province,a.city,a.district,a.detail from orders o,address a WHERE o.addressId=a.addressId AND o.userId=? AND o.orderId=?',[order.userId,order.orderId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.getOrderDetail=getOrderDetail;

function updateOrderStatus(order,callback){
    query('UPDATE orders SET status=? WHERE userId=? AND orderId=?',[order.status,order.userId,order.orderId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.updateOrderStatus=updateOrderStatus;

function insertGoodimg(url,callback){
    query('INSERT INTO goodsimg (url) VALUES (?)',[url],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        query('select id from goodsimg where url=?',[url],function(qerr,vals2,fields){
            if(qerr){
                console.log(qerr)
            }
            callback(vals2)
        });
    });
}
exports.insertGoodimg=insertGoodimg;

function showStores(userId,callback){
    query('select * from distributor',[userId],function(qerr,vals,fields){
        if(qerr){
            console.log(qerr)
        }
        callback(vals)
    });
}
exports.showStores=showStores;