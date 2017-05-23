let template=
    '<div id="box">'+
    '<section class="padding-all shop-money-box n-lv-bg">'+
    '<p class="f-02 color-whie text-c">可提现金额（元）</p>'+
    '<h4 class="color-whie text-c">0.00</h4>'+
    '<span class="f-02 color-whie text-c">总佣金0元</span>'+
    '</section>'+
    '<div class="padding-all text-c col-8 n-bs-f">'+
    '<p class="f-02">交易成功0天后才可分成佣金提现</p>'+
    '</div>'+
    '<section class="n-sale-list-box n-bs-f m-t006">'+
    '<ul class="int-nav-box-a my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-cert"></i><span>未分成订单佣金</span></label>'+
    '<span class="t-jiantou f-r f-02 n-right-box n-sect-i"><label class="n-right-tit f-05 col-lv">0元<label><i class="aui-iconfont aui-icon-left tf-180 jian-top int-jt-box "></i></label></label></span>'+
    '</li>'+
    '</ul>'+
    '<div class="inner-menu" style="display: none;">'+
    '<div class="int-cont-a padding-all shop-b">'+
    '<lable class="two-shop-tit">本店销售佣金<span class="f-r col-lv sale-right-tit f-04">0元</span></lable>'+
    '</div>'+
    '<div class="int-cont-a padding-all shop-b">'+
    '<lable class="two-shop-tit">一级分店佣金<span class="f-r col-lv sale-right-tit f-04">0元</span></lable>'+
    '</div>'+
    '<div class="int-cont-a padding-all shop-b">'+
    '<lable class="two-shop-tit">二级分店佣金<span class="f-r col-lv sale-right-tit f-04">0元</span></lable>'+
    '</div>'+
    '</div>'+
    '<ul class="int-nav-box-b my-new-m padding-all shop-b">'+
    '<li>'+
    '<label class="cate-shop-box"><i class="aui-iconfont aui-icon-cert"></i><span>已分成订单佣金</span></label>'+
    '<span class="t-jiantou f-r f-02 n-right-box n-sect-i"><label class="n-right-tit f-05 col-lv">0元<label><i class="aui-iconfont aui-icon-left tf-180 jian-top int-jt-box"></i></label></label></span>'+
    '</li>'+
    '</ul>'+
    '<div class="inner-menu" style="display: none;">'+
    '<div class="int-cont-b padding-all shop-b">'+
    '<lable class="two-shop-tit">本店销售佣金<span class="f-r col-lv sale-right-tit f-04">0元</span></lable>'+
    '</div>'+
    '<div class="int-cont-b padding-all shop-b">'+
    '<lable class="two-shop-tit">一级分店佣金<span class="f-r col-lv sale-right-tit f-04">0元</span></lable>'+
    '</div>'+
    '<div class="int-cont-b padding-all shop-b">'+
    '<lable class="two-shop-tit">二级分店佣金<span class="f-r col-lv sale-right-tit f-04">0元</span></lable>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '<div class="padding-all">'+
    '<div class="n-but-box n-lv-bg  b-r btn-info">'+
    '<span class="text-c color-whie f-08 ">申请提现</span>'+
    '</div>'+
    '<div class="n-t-a-center">'+
    '<button type="button" class="n-set-4-submit n-shop-back n-shop-but">'+
    '<span class="col-lv">返回</span>'+
    '</button>'+
    '</div>'+
    '</div>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
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
    $('.n-shop-back').click(function(){
        loadLib('/store-manage')
    })
}
CurrentJsLoad();