let template=
    '<div id="box" class="bg-color-whie">'+
    '<div class="n-sale-bg">'+
    '<div class="p-bt  n-m-b">'+
    '<ul class="dis-box">'+
    '<li class="n-sale-left-box">'+
    '<div class="n-sale-headerimg-box">'+
    '<img class="index_image2" src="/images/idx_user.png">'+
    '</div>'+
    '</li>'+
    '<li class="box-flex">'+
    '<div class="n-sale-right-box">'+
    '<h4>{{userName}}</h4>'+
    '<p>{{name}}</p>'+
    '<time class="color-whie f-03">开店时间：{{createTime}}</time>'+
    '</div></li>'+
    '<li class="sale-right-width">'+
    '<div class="n-sale-icon-size"><span><i class="aui-iconfont aui-icon-gear is-n-sezhi-size"></i></span></div>'+
    '</li>'+
    '</ul>'+
    '</div>'+
    '<div class="padding-all n-sale-nav">'+
    '<ul class="dis-box">'+
    '<li class="box-flex">'+
    '<p>总销售额（元）</p>'+
    '<h4>0.00</h4>'+
    '</li>'+
    '<li class="box-flex">'+
    '<p>佣金总额（元）</p>'+
    '<h4>0.00</h4>'+
    '</li>'+
    '<li class="box-flex">'+
    '<p>今日收入（元）</p>'+
    '<h4>0.00</h4>'+
    '</li>'+
    '</ul>'+
    '</div>'+
    '</div>'+
    '<section class="n-sale-list-box">'+
    '<ul class="int-nav-box-1 my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-star"></i><span>我的微店</span></label>'+
    '<span class="t-jiantou f-r"><i class="aui-iconfont aui-icon-right"></i></span>'+
    '</li>'+
    '</ul>'+
    '<ul class="int-nav-box-2 my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-cart"></i><span>我的商品</span></label>'+
    '<span class="t-jiantou f-r"><i class="aui-iconfont aui-icon-right"></i></span>'+
    '</li>'+
    '</ul>'+
    '<ul class="int-nav-box-a my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-share a_left n-is--icont-1"></i><span>我的</span></label>'+
    '<span class="t-jiantou fr n-sect-i"><i class="aui-iconfont aui-icon-right int-jt-box"></i></span>'+
    '</li>'+
    '</ul>'+
    '<div class="inner-menu" style="display: none;">'+
    '<div class="int-cont-a padding-all shop-b">'+
    '<lable class="two-shop-tit shop-my-stores">我的分店</lable>'+
    '</div>'+
    '</div>'+
    '<ul class="int-nav-box-c my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-cert a_left n-is--icont-2"></i><span>我的佣金</span></label>'+
    '<span class="t-jiantou fr n-sect-i"><i class="aui-iconfont aui-icon-right int-jt-box"></i></span>'+
    '</li>'+
    '</ul>'+
    '<div class="inner-menu" style="display: none;">'+
    '<div class="int-cont-c padding-all shop-b">'+
    '<lable class="two-shop-tit shop-my-money">我的佣金</lable>'+
    '</div>'+
    '<div class="int-cont-c padding-all shop-b">'+
    '<lable class="two-shop-tit">佣金提现</lable>'+
    '</div>'+
    '</div>'+
    '<ul class="int-nav-box-d my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-my a_left n-is--icont-3"></i><span>我的名片</span></label>'+
    '<span class="t-jiantou fr"><i class="aui-iconfont aui-icon-right"></i></span>'+
    '</li>'+
    '</ul>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad() {
    $('.n-sale-list-box ul').click(function () {
        let $thisIconf = $(this).find('.int-jt-box');
        let $thisNext = $(this).next();
        if ($thisNext.hasClass('inner-menu')) {
            let $nextDiv = $thisNext;
            if ($thisIconf.hasClass('current')) {
                $thisIconf.removeClass('current');
                $nextDiv.hide();
            } else {
                $thisIconf.addClass('current');
                $nextDiv.show();
            }
        }
    });
    $('.int-nav-box-1').click(function () {
        loadLib('/store')
    });
    $('.int-nav-box-2').click(function () {
        loadLib('/sale_2',{"type":"update"})
    });
    $('.int-nav-box-d').click(function () {
        loadLib('/business-card')
    });
    $('.shop-my-stores').click(function () {
        loadLib('/my-stores')
    });
    $('.shop-my-money').click(function () {
        loadLib('/my-money')
    });
}