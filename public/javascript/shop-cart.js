let template=
        '<div class="con">'+
        '<div class="o-t-good">'+
        '<div class="flow-price">'+
        '<div class="shop-tips">'+
        'touch微分销'+
        '</div>'+
        '<div class="select-all">'+
        '<label><input class="aui-checkbox" type="checkbox" name="demo"></label>'+
        '<span>全选</span>'+
        '</div>'+
        '</div>'+
        '<section class="ect-pro-list">'+
        '<ul>'+
        '<li class="n-flow1-box">'+
        '<div class="j-chack-box n-flow-ckecked">'+
        '<div class="chack-input-box">'+
        '<label><input class="aui-checkbox" type="checkbox" name="demo1"></label>'+
        '</div>'+
        '</div>'+
        '<div class="n-flow-right-sum">'+
        '<div class="ect-clear-over">'+
        '<span ><img src="http://shop.ectouch.cn/v2/images/201509/thumb_img/2296_thumb_G_1441858505320.jpg" ></span>'+
        '<dl>'+
        '<dt><h4 class="title"><span >旅游季包邮Crocs卡骆驰男女中性运动迪特洞洞鞋沙滩凉鞋|11991</span></h4></dt>'+
        '<dd class="ect-color999">'+
        '<p></p>'+
        '<p><strong class="ect-colory">￥499.00元</strong></p>'+
        '</dd>'+
        '</dl>'+
        '</div>'+
        '<div class="flow-num-del">'+
        '<div class="input-group wrap">'+
        '<span class="input-group-addon">-</span>'+
        '<input type="text" class="form-contro"  autocomplete="off" value="3">'+
        '<span class="input-group-addon">+</span>'+
        '</div>'+
        '<div class="pull-right">'+
        '<span class="aui-iconfont aui-icon-trash"></span>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '</ul>'+
        '</section>'+
        '<div class="price-tips">'+
        '共<b id="total_number">3</b>件商品，总价(不含运费)：<b class="ect-colory" id="goods_subtotal">￥1497.00元</b>'+
        '</div>'+
        '<div class="flow-jiesuan" style="background: #f7f7f7;">'+
        '<span class="btn-info">立即结算</span>'+
        '</div>'+
        '</div>'+
        '<div class="o-t-error">'+
        '<div class="img">'+
        '<img src="./images/TB-shop-cart.png">'+
        '</div>'+
        '<div class="info">'+
        '<h1 class="title">购物车快饿瘪了T.T</h1>'+
        '<p class="sub">主人快给我挑点宝贝吧</p>'+
        '<p class="btn">'+
        '<span>去逛逛</span>'+
        '</p>'+
        '</div>'+
        '</div>'+
        '</div>';
localStorage.setItem('template',template)
function CurrentJsLoad(){
    $('.btn-info').click(function () {
        loadLib('/make-order')
    })
}
