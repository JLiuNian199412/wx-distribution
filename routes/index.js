const express = require('express');
const request = require('request');
const http = require('http');
const crypto=require('crypto');
const formidable=require('formidable');
const fs=require('fs');
const util=require('util');
const userDao = require('../dao/userDao');
const shopDao = require('../dao/shopDao');
const router = express.Router();
const token = 'liunian_wx';
const appId = 'wxdc2bf0ab4a42e61f';
const appSecret = '7349d9438f14a4d043b234942bafc8aa';

/* GET home page. */
router.get('/validate', function (req, res, next) {
    function sha1(str){
        let md5sum = crypto.createHash("sha1");
        md5sum.update(str);
        str = md5sum.digest("hex");
        return str;
    }
    let key = new Array();
    key[0] = req.query.nonce;
    key[1] =req.query.timestamp;
    key[2] =token;
    key.sort();
    let str=key.join('');
    str=sha1(str);
    if(str==req.query.signature){
        res.end(req.query.echostr)
    }else{
        req.end(false)
    }
});
router.get('/', function (req, res, next) {
    let option = {};
    option.cssList = ['home.css'];
    option.jsList = ['home.js'];
    const {code} = req.query;
    if (!code) {
        // console.log('没有code, 准备授权');
        const redirect =encodeURIComponent('http://'+req.host+req.url).split('code')[0];
        res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
    } else {
        // console.log(`code: ${code}`);
        // console.log('授权完毕, 回调返回openId');
        request(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${appSecret}&code=${code}&grant_type=authorization_code`, {
            json: true,
        }, (err, _res, body) => {
            if (err) {
                console.log(err);
            }
            if(body.openid){
                req.session.openId = body.openid;
                console.log('获取到openId: ' + body.openid);
                console.log('获取到openId: ' + req.session.openId);
                userDao.userInfo(body,function (val) {
                    if(val&&val!=''&&val!=undefined){
                        req.session.userId=val[0].id;
                        option.val = val;
                        res.render('home', option);
                    }else{
                        request(`https://api.weixin.qq.com/sns/userinfo?access_token=${body.access_token}&openid=${body.openid}&lang=zh_CN`,{json:true}, (err, _res, body2) => {
                            if (err) {
                                console.log(err);
                            }
                            userDao.insert(body2,function (val) {
                                if(val){
                                    userDao.userInfo(body2,function (val2) {
                                        req.session.userId = val2.id;
                                        option.val = val2;
                                        option.val.userId = req.session.userId;
                                        res.render('home', option);
                                    })
                                }else {
                                    res.render('home', option);
                                }
                            })
                        })
                    }

                })
            }
        })
    }
});

router.get('/home', function (req, res, next) {
    let user={};
    user.id=req.session.userId;
    let option = {};
    option.cssList = ['home.css'];
    option.jsList = ['home.js'];
    option.type = 'home';
    userDao.getUserInfo(user,function (val) {
        option.val = val;
        option.userId = user.id;
        res.json(option);
    })
});

router.get('/shop', function (req, res, next) {
    let option = {};
    option.cssList = ['shop.css'];
    option.jsList = ['shop.js'];
    option.type = 'shop';
    option.val = '';
    res.json(option);
});

router.get('/hasStore', function (req, res, next) {
    let option = {};
    let user={};
    user.userId=req.session.userId;
    userDao.searchStore(user,function (val) {
        if(val&&val!=''){
            option.val = val;
            option.val.userStatus = 'store';
            res.json(option);
        }else{
            option.val={};
            option.val.userStatus = 'no-store';
            res.json(option);
        }

    });
});

router.get('/store', function (req, res, next) {
    let option = {};
    option.cssList = ['store.css'];
    option.jsList = ['store.js'];
    option.type = 'store';
    let user={};
    user.userId=req.session.userId;
    userDao.searchStore(user,function (val) {
        if(val&&val!=''){
            option.val = val;
            option.val.userStatus = 'store';
            userDao.showStores(req.session.userId,function (val) {
                option.val = val[0];
                res.json(option);
            })
        }else{
            option.val={};
            option.val.userStatus = 'no-store';
            res.json(option);
        }

    });
});
router.get('/shop-cart', function (req, res, next) {
    let option = {};
    option.cssList = ['shop-cart.css'];
    option.jsList = ['shop-cart.js'];
    option.type = 'shopCart';
    shopDao.showShopcat(req.session.userId,function (val) {
        if(val!=''&&val){
            option.val = {};
            option.val.List = val;
            option.val.totalPrice=0;
            option.val.totalQty=0;
            let i=0;
            val.forEach(function (v,_) {
                i++;
                option.val.totalQty+=v.goodsQty;
                option.val.totalPrice+=v.price*v.goodsQty;
                if(i==val.length){
                    res.json(option);
                }
            });
        }else{
            option.val='empty';
            res.json(option);
        }

    })
})
;router.get('/mine', function (req, res, next) {
    let option = {};
    let user={};
    user.openid=req.session.openId;
    option.cssList = ['mine.css'];
    option.jsList = ['mine.js'];
    option.type = 'mine';
    user.userId=req.session.userId;
    userDao.userInfo(user,function (val) {
        option.val = val[0];
        userDao.countCollection(user,function (val2) {
            userDao.showHistory(user,function (val3) {
                option.val.countCollection=val2[0].total;
                option.val.historyList=val3;
                res.json(option);
            })

        })
    })
});
router.get('/search', function (req, res, next) {
    let option = {};
    option.cssList = ['search.css'];
    option.jsList = ['search.js'];
    option.type = 'search';
    userDao.showSearch(req.session.userId,function (val) {
        option.val={};
        option.val.List = val;
        res.json(option);
    })

});
router.get('/shop-production', function (req, res, next) {
    let option = {};
    option.cssList = ['shop-production.css'];
    option.jsList = ['shop-production.js'];
    option.type = 'shop-production';
    let goods={};
    goods.index=1;
    goods.account=6;
    if(req.query.prdType&&req.query.detailType){
        goods.type=req.query.prdType;
        goods.detailType=req.query.detailType;
        goods.sex=req.query.sex;
        if(goods.sex!=0){
            shopDao.goodTypeInfo2(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val=null;
                    res.json(option);
                }
            })
        }else{
            shopDao.goodTypeInfo(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val=null;
                    res.json(option);
                }
            })
        }
    }else {
        goods.sortBy='g.id';
        goods.sortDirection='ASC';
        if(req.query.searchContent&&req.query.searchContent!=''){
            goods.content='%'+req.query.searchContent+'%';
            shopDao.searchGoods(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val=null;
                    res.json(option);
                }
            })
        }else{
            shopDao.goodsInfo(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val=null;
                    res.json(option);
                }
            })
        }
    }

});
router.get('/production-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['production-detail.css'];
    option.jsList = ['production-detail.js'];
    option.type = 'production-detail';
    if(req.query.goodsId&&req.query.goodsId!=''&&req.query.goodsId!=undefined){
        shopDao.goodInfo(req.query.goodsId,function (val) {
            val[0].marketPrice=val[0].price*1.2+'0';
            option.val={};
            option.val = val[0];
            res.json(option);
        })
    }else{
        option.val = 'err';
        res.json(option);
    }

});
router.get('/sale_1', function (req, res, next) {
    let option = {};
    option.cssList = ['sale_1.css'];
    option.jsList = ['sale_1.js'];
    option.type = 'sale_1';
    option.val = '';
    res.json(option);
});

router.get('/new-store', function (req, res, next) {
    let option = {};
    option.userId=req.session.userId;
    option.name=req.query.shopName;
    option.userName=req.query.realName;
    option.phone=req.query.shopMobile;
    option.time=new Date().getFullYear()+'-'+(myDate.getMonth()+1)+'-'+ myDate.getDate()+' '+myDate.getHours()+':'+ myDate.getMinutes()+':'+ myDate.getSeconds();;
    if(req.query.shopQq){
        option.qq=req.query.shopQq;
    }else{
        option.qq='';
    }
    if(option.userId&&option.userId!=''){
        userDao.newStore(option,function (val) {
            if(req.query.prevId){
                option.prevId=req.query.prevId;
                userDao.updatePrevId(option,function (val2) {
                    res.json(val);
                })
            }else{
                res.json(val);
            }
        })
    }else {
        res.json('err');
    }
});

router.get('/sale_2', function (req, res, next) {
    let option = {};
    option.cssList = ['sale_2.css'];
    option.jsList = ['sale_2.js'];
    option.type = 'sale_2';
    option.val={};
    let user={};
    user.userId=req.session.userId;
    if(req.query.type){
        if(req.query.type=='update'){
            userDao.getGoodType(user,function (val) {
                option.val= val[0];
                option.val.type= req.query.type;
                res.json(option);
            })
        }else{
            option.val.type= req.query.type;
            res.json(option);
        }
    }

});
router.get('/updateGoodsType', function (req, res, next) {
    let option = {};
    option.userId=req.session.userId;
    if(option.userId&&option.userId!=''){
        option.goodsType=req.query.list.join(',');
        userDao.updateGoodType(option,function (val) {
            res.json(val);
        })
    }else{
        res.json('err');
    }


});

router.get('/sale_3', function (req, res, next) {
    let option = {};
    option.cssList = ['sale_3.css'];
    option.jsList = ['sale_3.js'];
    option.type = 'sale_3';
    option.val = {"userId":req.session.userId};
    res.json(option);
});
router.get('/store-manage', function (req, res, next) {
    let option = {};
    option.cssList = ['store-manage.css'];
    option.jsList = ['store-manage.js'];
    option.type = 'store-manage';
    let user={};
    user.id=req.session.userId;
    userDao.getUserInfo(user,function (val) {
        userDao.showStores(user.id,function (val2) {
            option.val = val2[0];
            option.val.userName=val[0].name;
            res.json(option);
        })
    })

});
router.get('/my-stores', function (req, res, next) {
    let option = {};
    option.cssList = ['my-stores.css'];
    option.jsList = ['my-stores.js'];
    option.type = 'my-stores';
    option.val = '';
    res.json(option);
});
router.get('/stores-list', function (req, res, next) {
    let option = {};
    option.cssList = ['stores-list.css'];
    option.jsList = ['stores-list.js'];
    option.type = 'stores-list';
    option.val = '';
    res.json(option);
});
router.get('/store-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['store-detail.css'];
    option.jsList = ['store-detail.js'];
    option.type = 'store-detail';
    option.val = '';
    res.json(option);
});
router.get('/my-money', function (req, res, next) {
    let option = {};
    option.cssList = ['my-money.css'];
    option.jsList = ['my-money.js'];
    option.type = 'my-money';
    option.val = '';
    res.json(option);
});
router.get('/business-card', function (req, res, next) {
    let option = {};
    option.cssList = ['business-card.css'];
    option.jsList = ['business-card.js'];
    option.type = 'business-card';
    option.val = '';
    res.json(option);
});
router.get('/my-collection', function (req, res, next) {
    let option = {};
    option.cssList = ['my-collection.css'];
    option.jsList = ['my-collection.js'];
    option.type = 'my-collection';
    let user={};
    user.userId=req.session.userId;
    if(user.userId){
        userDao.showCollections(user,function (val) {
            option.val={};
            option.val.List=val;
            let i=0;
            option.val.List.forEach(function (v,_) {
                i++;
                option.val.List[_].marketPrice=v.price*1.2;
                if(i==option.val.List.length){
                    res.json(option);
                }
            });
        })
    }else{
        option.val = 'err';
        res.json(option);
    }


});
router.get('/my-order', function (req, res, next) {
    let option = {};
    option.cssList = ['my-order.css'];
    option.jsList = ['my-order.js'];
    option.type = 'my-order';
    let user={};
    user.userId=req.session.userId;
    userDao.orderList(user,function (val) {
        if(val&&val!=''){
            option.val={};
            option.val.List = val;
            res.json(option);
        }
    });

});
router.get('/person-info', function (req, res, next) {
    let option = {};
    option.cssList = ['person-info.css'];
    option.jsList = ['person-info.js'];
    option.type = 'person-info';
    let user={};
    user.id=req.session.userId;
    userDao.getUserInfo(user,function (val) {
        option.val = val[0];
        res.json(option);
    });
});
router.get('/address-list', function (req, res, next) {
    let option = {};
    option.cssList = ['address-list.css'];
    option.jsList = ['address-list.js'];
    option.type = 'address-list';
    let user={};
    user.userId=req.session.userId;
    userDao.showAddressList(user,function (val) {
        option.val ={};
        option.val.List =val;
        res.json(option);
    })

});
router.get('/address-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['address-detail.css'];
    option.jsList = ['address-detail.js'];
    option.type = 'address-detail';
    let address={};
    address.type=req.query.type;
    address.userId=req.session.userId;
    if(address.type&&address.type!=''){
        if(address.type=="add"){
            option.val = {};
            option.val.title='新增地址';
            res.json(option);
        }else if(address.type=='edit'){
            address.addressId=req.query.addressId;
            userDao.showAddressDetail(address,function (val) {
                option.val = val[0];
                option.val.title='编辑地址';
                res.json(option);
            })

        }

    }else{
        res.json('err');
    }

});
router.get('/make-order', function (req, res, next) {
    let option = {};
    option.cssList = ['make-order.css'];
    option.jsList = ['make-order.js'];
    option.type = 'make-order';
    let order={};
    option.val = {};
    option.val.totalPrice=0;
    option.val.Qty=0;
    order=req.query.goods;
    let i=0;
    if(order&&order!=''){
        order.forEach(function (v,_) {
            shopDao.goodInfo(v.goodId,function (val) {
                i++;
                order[_].name=val[0].name;
                order[_].price=val[0].price;
                order[_].url=val[0].url;
                option.val.totalPrice+=parseInt(val[0].price)* parseInt(order[_].number);
                option.val.totalQty+=parseInt(order[_].number);
                if(i==order.length){
                    option.val.List =order;
                    res.json(option);
                }
            })

        });

    }
});
router.get('/order-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['order-detail.css'];
    option.jsList = ['order-detail.js'];
    option.type = 'order-detail';
    let order={};
    order.userId=req.session.userId;
    if(order.userId&&order.userId!=''){
        order.orderId=req.query.orderId;
        userDao.getOrderDetail(order,function (val) {
            val[0].goodDetail=[];
            if(val[0].goods.indexOf(',')>0){
                let goodId=[],number=[];
                goodId=val[0].goods.split(',');
                number=val[0].numbers.split(',');
                for(var i=0;i<goodId.length;i++){
                    shopDao.goodInfo(goodId[i],function (val2) {
                        val[0].goodDetail[i]=val2;
                        val[0].goodDetail[i].number=number[i];
                        val[0].goodDetail[i].totalPrice=number[i]*val[0].goodDetail[i].price;
                        if(i=goodId.length){
                            option.val = val[0];
                            res.json(option);
                        }
                    })
                }
            }else{
                shopDao.goodInfo(val[0].goods,function (val2) {
                    val[0].goodDetail=val2;
                    val[0].goodDetail[0].number=val[0].numbers;
                    val[0].goodDetail[0].totalPrice=val[0].numbers*val[0].goodDetail[0].price;
                    option.val = val[0];
                    res.json(option);
                })
            }

        })
    }else{
        option.val = 'err';
        res.json(option);
    }
});

router.get('/people-like', function (req, res, next) {
    let goods = {};
    goods.sortBy='g.id';
    goods.sortDirection='ASC';
    goods.index=1;
    goods.account=4;
    shopDao.goodsLike(req.session.userId,function (val) {
        if(val==''&&val==undefined){
            shopDao.goodsInfo(goods,function (val2) {
                res.json(val2);
            })
        }else{
            res.json(val);
        }
    });
});
router.get('/product-sort', function (req, res, next) {
    let option = {};
    let goods = {};
    option.id = req.session.userId;
    goods.sortBy='g.id';
    goods.sortDirection='ASC';
    goods.index=1;
    goods.account=6;
    goods.sex=0;
    if(req.query.sortBy&&req.query.sortDirection){
        goods.sortBy=req.query.sortBy;
        goods.sortDirection=req.query.sortDirection;
    }
    if(req.query.index&&req.query.account){
        goods.index=req.query.index;
        goods.account=req.query.account;
    }
    if(req.query.prdType&&req.query.detailType){
        goods.type=req.query.prdType;
        goods.detailType=req.query.detailType;
        goods.sex=req.query.sex;
        if(goods.sex!=0){
            shopDao.goodsSexSort(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val='err';
                    res.json(option);
                }
            })
        }else{
            shopDao.goodsTYpeSort(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val='err';
                    res.json(option);
                }
            })
        }
    }else {
        goods.sortBy='g.'+goods.sortBy;
        if(req.query.searchContent&&req.query.searchContent!=''){
            goods.content='%'+req.query.searchContent+'%';
            shopDao.searchGoods(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val='err';
                    res.json(option);
                }
            })
        }else{
            shopDao.goodsInfo(goods,function (val) {
                if(val!=''&&val!=undefined){
                    option.val={};
                    option.val.List = val;
                    res.json(option);
                }else {
                    option.val='err';
                    res.json(option);
                }
            })
        }
    }
});

router.get('/insert-shopcart', function (req, res, next) {
    let option={};
    option.goodId=req.query.goodId;
    option.qty=req.query.qty;
    option.userId=req.session.userId;
    if(option.goodId&&option.qty&&option.userId){
        shopDao.befInsertShopcat(option,function (val) {
            if(val==''||val==undefined){
                shopDao.insertShopcat(option,function (val2) {
                    if(val2!=''&&val2!=undefined){
                        res.json(val2);
                    }else{
                        val='err';
                        res.json(val2);
                    }
                });
            }else{
                option.qty=parseInt(option.qty)+val[0].goodsQty;
                shopDao.updateShopcat(option,function (val3) {
                    if(val3!=''&&val3!=undefined){
                        res.json(val3);
                    }else{
                        val='err';
                        res.json(val3);
                    }
                })
            }
        })
    }else {
        res.json('err')
    }
});
router.get('/delete-shopcart', function (req, res, next) {
    let option={};
    option.cartId=req.query.cartId;
    option.userId=req.session.userId;
    if(option.cartId&&option.userId){
        shopDao.deleteShopcat(option,function (val) {
            if(val!=''&&val){
                res.json(val)
            }else {
                res.json('err')
            }
        })
    }else {
        res.json('err')
    }
});

router.get('/count-shopcart', function (req, res, next) {
    let option={};
    option.userId=req.session.userId;
    if(option.userId){
        shopDao.countShopcat(option,function (val) {
            res.json(val)
        })
    }else{
        res.json('err');
    }

});

router.get('/insert-search', function (req, res, next) {
    let option={};
    option.userId=req.session.userId;
    option.text=req.query.text;
    if(option.userId&&option.text){
        userDao.selectSearch(option,function (val) {
            if(val&&val!=''){
                res.json(val)
            }else{
                userDao.insertSearch(option,function (val2) {
                    res.json(val2)
                })
            }
        })
    }else{
        res.json('err');
    }

});

router.get('/delete-search', function (req, res, next) {
    let option={};
    option.userId=req.session.userId;
    if(option.userId){
        userDao.deleteSearch(option.userId,function (val) {
            if(val&&val!=''){
                res.json(val)
            }else{
                res.json('err');
            }
        })
    }else{
        res.json('err');
    }

});

router.get('/edit-collection', function (req, res, next) {
    let option={};
    option.userId=req.session.userId;
    option.type=req.query.type;
    option.goodId=req.query.goodId;
    if(option.userId&&option.type&&option.goodId){
        if(option.type=="add"){
            userDao.addCollection(option,function (val) {
                if(val&&val!=''){
                    shopDao.addPop(option,function () {
                        res.json(val);
                    })
                }else{
                    res.json('err');
                }
            })
        }else if(option.type=="cancel"){
            userDao.deleteCollection(option,function (val) {
                if(val&&val!=''){
                    shopDao.deletePop(option,function () {
                        res.json(val);
                    })
                }else{
                    res.json('err');
                }
            })
        }else if(option.type=="show"){
            userDao.showCollection(option,function (val) {
                if(val&&val!=''){
                    res.json(val)
                }else{
                    res.json('err');
                }
            })
        }

    }else{
        res.json('err');
    }
});

router.get('/count-collection', function (req, res, next) {
    let option={};
    option.userId=req.session.userId;
    if(option.userId){
        userDao.countCollection(option,function (val) {
            res.json(val)
        })
    }else{
        res.json('err');
    }

});

router.get('/change-history', function (req, res, next) {
    let user={};
    user.userId=req.session.userId;
    user.goodId=req.query.goodsId;
    if(user.userId&&user.userId!=''){
        userDao.searchHistory(user,function (val) {
            if(val&&val!=''){

            }else{
                userDao.addHistory(user,function () {
                    userDao.countHistory(user,function (val2) {
                        if(val2&&val2!=''&&val2[0].total>6){
                            userDao.deleteHistory(user,function () {
                                
                            })
                        }
                    })
                })
            }
        })

    }
});

router.get('/delete-history', function (req, res, next) {
    let user={};
    user.userId=req.session.userId;
    if(user.userId&&user.userId!=''){
        userDao.deleteAllHistory(user,function (val) {
            res.json(val)
        })
    }else{
        res.json('err')
    }
});

router.get('/update-person', function (req, res, next) {
    let user={};
    user.userId=req.session.userId;
    user.email=req.query.email;
    if(user.userId&&user.userId!=''){
        userDao.updateUserInfo(user,function (val) {
            res.json(val)
        })
    }else{
        res.json('err')
    }
});

router.get('/update-address', function (req, res, next) {
    let address={};
    address.userId=req.session.userId;
    address.type=req.query.type;
    address.name=req.query.name;
    address.phone=req.query.phone;
    address.province=req.query.province;
    address.city=req.query.city;
    address.district=req.query.district;
    address.detail=req.query.detail;
    if(address.userId&&address.userId!=''){
        if(address.type=='add'){
            userDao.addAddress(address,function (val) {
                res.json(val)
            })
        }else if(address.type=="edit"){
            address.addressId=req.query.addressId;
            userDao.updateAddressDetail(address,function (val) {
                res.json(val)
            })
        }
    }else{
        res.json('err')
    }
});

router.get('/delete-address', function (req, res, next) {
    let address={};
    address.userId=req.session.userId;
    address.addressId=req.query.addressId
    if(address.userId&&address.userId!=''){
        userDao.deleteAddress(address,function (val) {
            res.json(val)
        })
    }else{
        res.json('err')
    }
});

router.get('/set-defaultAddress', function (req, res, next) {
    let address={};
    address.userId=req.session.userId;
    if(address.userId&&address.userId!=''){
        address.addressId=req.query.addressId;
        userDao.setDefaultAddress(address,function (val) {
            res.json(val)
        })
    }else{
        res.json('err')
    }
});

router.get('/get-address', function (req, res, next) {
    let address={};
    address.userId=req.session.userId;
    if(address.userId&&address.userId!=''){
        userDao.getDefaultAddress(address,function (val) {
            res.json(val)
        })
    }else{
        res.json('err')
    }
});

router.get('/insert-order', function (req, res, next) {
    let order={};
    order.userId=req.session.userId;
    if(order.userId&&order.userId!=''){
        order=req.query.orderInfo;
        order.userId=req.session.userId;
        userDao.insertOrder(order,function (val) {
            if(val.affectedRows>0){
                let cart={};
                cart.userId=order.userId;
                let deleStatus=true;
                for(var i=0;i<order.cartId.length;i++){
                    cart.cartId=order.cartId[i];
                    shopDao.deleteShopcat(cart,function (val2) {
                        if(val2.affectedRows==0){
                            deleStatus=false;
                        }
                        if(i==order.cartId.length){
                            res.json(deleStatus)
                        }
                    })
                }
            }

        })
    }else{
        res.json('err')
    }
});
router.get('/update-goods', function (req, res, next) {
    let good={};
    good.userId=req.session.userId;
    if(good.userId&&good.userId!=''){
        if(req.query.goodInfo){
            for(var i=0;i<req.query.goodInfo.list.length;i++){
                good.goodId=req.query.goodInfo.list[i].goodId;
                good.num=req.query.goodInfo.list[i].num;
                shopDao.updateGood(good,function (val) {
                    if(i==req.query.goodInfo.list.length){
                        res.json(val)
                    }
                })
            }
        }
    }else{
        res.json('err')
    }
});

router.get('/update-order', function (req, res, next) {
    let good={};

    if(req.session.userId){
        good.userId=req.session.userId;
    }else {
        good.userId=17;
    }
    if(good.userId&&good.userId!=''){
        if(req.query.orderId){
            good.status=req.query.status;
            good.orderId=req.query.orderId;
            userDao.updateOrderStatus(good,function (val) {
                res.json(val)
            })
        }
    }else{
        res.json('err')
    }
});

router.get('/admin-manage', function (req, res, next) {
    res.render("manage")
});

router.get('/get-goodList',function (req,res,next) {
    let goods={};
    goods.index=1;
    goods.account=6;
    goods.sortBy='id';
    goods.sortDirection='DESC';
    if(req.query.index){
        goods.index=req.query.index;
    }
    shopDao.goodsInfo(goods,function (val) {
        let option={};
        option.list=val;
        res.json( option)
    })
});


router.get('/get-orderList',function (req,res,next) {
    let goods={};
    goods.index=1;
    goods.account=6;
    goods.sortBy='orderId';
    goods.sortDirection='DESC';
    if(req.query.index){
        goods.index=req.query.index;
    }
    userDao.getOrderList(goods,function (val) {
        let option={};
        option.list=val;
        res.json( option)
    })
});

router.get('/remove-good',function (req,res,next) {
    if(req.query.goodId){
        shopDao.deleteGood(req.query.goodId,function (val) {
            res.json(val)
        })
    }
});

router.post('/add-goods',function (req,res,next) {
    let goods={};
    var form = new formidable.IncomingForm();
    // form.uploadDir = '/PJ/public/upload/upload-images/';
    // form.keepExtensions = true; //保留后缀
    // form.maxFieldsSize = 2*1024; //文件大小
    form.parse(req, function (err, fields, files) {
        if (err) {
            response.locals.error = err;
            // response.render("uploads");
            return;
        }
        if(files.good_icon.name!=''){
            var extName ='';  //后缀名
            // console.log(files.user_icon);
            // console.log('files.in_file.type: '+files.user_icon.type);
            switch (files.good_icon.type) {  //此处user_icon  为页面端 <input type=file name=user_icon>
                case 'image/jpeg':
                    extName = 'jpeg';
                    break;
                case 'image/jpg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }
            if(extName.length == 0){
                res.send('只支持png和jpg格式图片');
                return;
            }
            else{
                // console.log('yes');
                form.uploadDir = "../public/images/";     //设置上传目录
                form.keepExtensions = true;     //保留后缀
                form.maxFieldsSize = 2 * 1024;   //文件大小
                // console.log('here');
                var myDate = new Date();
                var avatarName = myDate.getFullYear()+''+(myDate.getMonth()+1)+myDate.getDate()+myDate.getHours()+ myDate.getMinutes()+myDate.getSeconds()+req.session.userId + '.' + extName;
                var newPath = form.uploadDir + avatarName;
                // fs.renameSync(files.user_icon.path, newPath);  //重命名
                var readStream=fs.createReadStream(files.good_icon.path);
                var writeStream=fs.createWriteStream(newPath);
                readStream.pipe(writeStream);
                readStream.on('end',function(){
                    fs.unlinkSync(files.good_icon.path);
                });
                var good={};
                good.goodName=fields.goodName;
                good.goodType=fields.goodType;
                good.goodDetailType=fields.goodDetailType;
                good.goodQty=fields.goodQty;
                good.goodPrice=fields.goodPrice;
                good.sex=fields.sex;
                good.url=avatarName;
                userDao.insertGoodimg(good.url,function (val) {
                    good.picId=val[0].id;
                    shopDao.insertGoods(good,function (result) {
                        if(result.affectedRows==1){
                            res.send('uploads success');
                        }else {
                            res.send('uploads fail');
                        }
                    })
                })
            }
        }else {
            res.send('uploads fail');
        }
    })
})
module.exports = router;

