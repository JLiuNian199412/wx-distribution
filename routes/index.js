const express = require('express');
const request = require('request');
const http = require('http');
const crypto=require('crypto');
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
router.get('/store', function (req, res, next) {
    let option = {};
    option.cssList = ['store.css'];
    option.jsList = ['store.js'];
    option.type = 'store';
    option.val = '';
    res.json(option);
});
router.get('/shop-cart', function (req, res, next) {
    let option = {};
    option.cssList = ['shop-cart.css'];
    option.jsList = ['shop-cart.js'];
    option.type = 'shopCart';
    option.val = '';
    res.json(option);
})
;router.get('/mine', function (req, res, next) {
    let option = {};
    let user={};
    user.openid=req.session.openId;
    option.cssList = ['mine.css'];
    option.jsList = ['mine.js'];
    option.type = 'mine';
    userDao.userInfo(user,function (val) {
        option.val = val;
        res.json(option);
    })
});
router.get('/search', function (req, res, next) {
    let option = {};
    option.cssList = ['search.css'];
    option.jsList = ['search.js'];
    option.type = 'search';
    option.val = '';
    res.json(option);
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
                    function insertImg(callback) {
                        let i=0;
                        val.forEach(function (v,_) {
                            shopDao.goodImg(v.picId,function (img) {
                                i++;
                                if(img&&img!=''){
                                    val[_].picUrl=img[0].url;
                                }
                                if(i==val.length){
                                    callback(val);
                                }
                            })
                        });
                    }
                    insertImg(function(value){
                        option.val={};
                        option.val.List = value;
                        res.json(option);
                    })
                }else {
                    option.val={};
                    res.json(option);
                }
            })
        }else{
            shopDao.goodTypeInfo(goods,function (val) {
                if(val!=''&&val!=undefined){
                    function insertImg(callback) {
                        let i=0;
                        val.forEach(function (v,_) {
                            shopDao.goodImg(v.picId,function (img) {
                                i++;
                                if(img&&img!=''){
                                    val[_].picUrl=img[0].url;
                                }
                                if(i==val.length){
                                    callback(val);
                                }
                            })
                        });
                    }
                    insertImg(function(value){
                        option.val={};
                        option.val.List = value;
                        res.json(option);
                    })
                }else {
                    option.val={};
                    res.json(option);
                }
            })
        }
    }else{
        goods.sortBy='id';
        goods.sortDirection='ASC';
        if(req.query.sortBy&&req.query.sortDirection){
            goods.sortBy=req.query.sortBy;
            goods.sortDirection=req.query.sortDirection;
        }
        shopDao.goodsInfo(goods,function (val) {
            if(val!=''&&val!=undefined){
                function insertImg(callback) {
                    let i=0;
                    val.forEach(function (v,_) {
                        i++;
                        shopDao.goodImg(v.picId,function (img) {
                            if(img&&img!=''){
                                val[_].picUrl=img[0].url;
                            }
                            if(i==val.length){
                                callback(val);
                            }
                        })
                    });
                }
                insertImg(function(value){
                    option.val={};
                    option.val.List = value;
                    res.json(option);
                })
            }else {
                option.val={};
                res.json(option);
            }
        })
    }


});
router.get('/production-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['production-detail.css'];
    option.jsList = ['production-detail.js'];
    option.type = 'production-detail';
    if(req.query.goodsId&&req.query.goodsId!=''&&req.query.goodsId!=undefined){
        shopDao.goodInfo(req.query.goodsId,function (val) {
            function insertImg(callback) {
                let i=0;
                val.forEach(function (v,_) {
                    i++;
                    shopDao.goodImg(v.picId,function (img) {
                        if(img&&img!=''){
                            val[_].picUrl=img[0].url;
                            val[_].marketPrice=val[_].price*1.2+'0';
                        }
                        if(i==val.length){
                            callback(val);
                        }
                    })
                });
            }
            insertImg(function(value){
                option.val={};
                option.val = value[0];
                res.json(option);
            })
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
router.get('/sale_2', function (req, res, next) {
    let option = {};
    option.cssList = ['sale_2.css'];
    option.jsList = ['sale_2.js'];
    option.type = 'sale_2';
    option.val = '';
    res.json(option);
});
router.get('/sale_3', function (req, res, next) {
    let option = {};
    option.cssList = ['sale_3.css'];
    option.jsList = ['sale_3.js'];
    option.type = 'sale_3';
    option.val = '';
    res.json(option);
});
router.get('/store-manage', function (req, res, next) {
    let option = {};
    option.cssList = ['store-manage.css'];
    option.jsList = ['store-manage.js'];
    option.type = 'store-manage';
    option.val = '';
    res.json(option);
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
    option.val = '';
    res.json(option);
});
router.get('/my-order', function (req, res, next) {
    let option = {};
    option.cssList = ['my-order.css'];
    option.jsList = ['my-order.js'];
    option.type = 'my-order';
    option.val = '';
    res.json(option);
});
router.get('/person-info', function (req, res, next) {
    let option = {};
    option.cssList = ['person-info.css'];
    option.jsList = ['person-info.js'];
    option.type = 'person-info';
    option.val = '';
    res.json(option);
});
router.get('/address-list', function (req, res, next) {
    let option = {};
    option.cssList = ['address-list.css'];
    option.jsList = ['address-list.js'];
    option.type = 'address-list';
    option.val = '';
    res.json(option);
});
router.get('/address-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['address-detail.css'];
    option.jsList = ['address-detail.js'];
    option.type = 'address-detail';
    option.val = '';
    res.json(option);
});
router.get('/make-order', function (req, res, next) {
    let option = {};
    option.cssList = ['make-order.css'];
    option.jsList = ['make-order.js'];
    option.type = 'make-order';
    option.val = '';
    res.json(option);
});
router.get('/order-detail', function (req, res, next) {
    let option = {};
    option.cssList = ['order-detail.css'];
    option.jsList = ['order-detail.js'];
    option.type = 'order-detail';
    option.val = '';
    res.json(option);
});
module.exports = router;

router.get('/people-like', function (req, res, next) {
    let option = {};
    let goods = {};
    option.id = req.session.userId;
    goods.sortBy='id';
    goods.sortDirection='ASC';
    goods.index=1;
    goods.account=4;
    shopDao.goodsLike(option,function (val) {
        if(val==''||val==undefined){
            shopDao.goodsInfo(goods,function (val2) {
                function insertImg(callback) {
                    let i=0;
                    val2.forEach(function (v,_) {
                        shopDao.goodImg(v.picId,function (img) {
                            i++;
                            if(img&&img!=''){
                                val2[_].picUrl=img[0].url;
                            }
                            if(i==val2.length){
                                callback(val2);
                            }
                        })
                    });
                }
                insertImg(function(value){
                    res.json(value);
                })
            })
        }else{
            function insertImg(callback) {
                let i=0;
                val.forEach(function (v,_) {
                    shopDao.goodImg(v.picId,function (img) {
                        i++;
                        if(img&&img!=''){
                            val[_].picUrl=img[0].url;
                        }
                        if(i==val.length){
                            callback(val);
                        }
                    })
                });
            }
            insertImg(function(value){
                res.json(value);
            })
        }
    });
});
module.exports = router;

