let template=
    '<div class="con">'+
    '<div class="goods" style="margin-bottom: 0rem;">'+
    '<div class="ect-bg">'+
    '<header class="goods-fixed header-menu">'+
    '<div class="goods-left-jiat"><i class="aui-iconfont aui-icon-left is-con"></i></div>'+
    '<div class="box-flex">'+
    '</div>'+
    '<div class="goods-left-jiat"><i class="aui-iconfont aui-icon-more j-nav-box is-con"></i></div>'+
    '<div class="goods-nav">'+
    '<ul class="goods-nav-box">'+
    '<li><i class="aui-iconfont aui-icon-home j-nav-box"></i>首页</li>'+
    '<li><i class="aui-iconfont aui-icon-comment j-nav-box"></i>消息</li>'+
    '<li><i class="aui-iconfont aui-icon-my j-nav-box"></i>用户中心</li>'+
    '<li style="border:none"><i class="aui-iconfont aui-icon-menu j-nav-box"></i>全部订单</li>'+
    '</ul>'+
    '</div>'+
    '</header>'+
    '</div>'+
    '<div class="goods-photo">'+
    '<span class="goods-num" id="goods-num"><span id="g-active-num">1</span>/<span id="g-all-num">1</span></span>'+
    '<ul class="swiper-wrapper">'+
    '<li class="swiper-slide tb-lr-center swiper-slide-active">'+
    '<div class="of-hidden" id="img-photo-box" style="width:375px;height: 375px;">'+
    '<img id="img-photo" src="/images/{{url}}" >'+
    '</div>'+
    '</li>'+
    '</ul>'+
    '</div>'+
    '<div class="goods-info">'+
    '<section class="goods-title">'+
    '<div class="dis-box">'+
    '<h3 class="box-flex">{{name}}</h3>'+
    '<span class="heart" data-id="{{id}}" id="ECS_COLLECT">'+
    '<i class="ts-2 aui-iconfont aui-icon-like"></i>'+
    '<em class="ts-2">收藏</em>'+
    '</span>'+
    '</div>'+
    '</section>'+
    '<section class="goods-price">'+
    '<p class="p-price">'+
    '<span>￥{{price}}</span>'+
    '</p>'+
    '<p class="p-market">市场价<del>￥{{marketPrice}}元</del>'+
    '</p>'+
    '<p class=" dis-box">'+
    '<span class="box-flex text-left">销量：{{sales}}</span>'+
    '<span class="box-flex text-right">库存: {{qty}}</span>'+
    '</p>'+
    '</section>'+
    '<section class="goods-service">'+
    '<div class="dis-box">'+
    '<div class="box-flex">'+
    '<div class="dis-box">'+
    '<p class="box-flex t-goods2">本服务由touch微分销提供售后服务与产品支持</p>'+
    '</div>'+
    '<div class="dis-box goods-service-list g-r-rule">'+
    '<p class="box-flex t-remark3">'+
    '<em class="fl em-promotion"><i class="aui-iconfont aui-icon-laud"></i></em>'+
    '<span class="fl">正品保证</span>'+
    '</p>'+
    '<p class="box-flex t-remark3">'+
    '<em class="fl em-promotion"><i class="aui-iconfont aui-icon-location"></i></em>'+
    '<span class="fl">货到付款</span>'+
    '</p>'+
    '<p class="box-flex t-remark3">'+
    '<em class="fl em-promotion"><i class="aui-iconfont aui-icon-back"></i></em>'+
    '<span class="fl">7天退货</span>'+
    '</p>'+
    '<p class="box-flex t-remark3">'+
    '<em class="fl em-promotion"><i class="aui-iconfont aui-icon-flag"></i></em>'+
    '<span class="fl">极速达</span>'+
    '</p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '<form action="javascript:addToCart(8048)" method="post" name="ECS_FORMBUY" id="ECS_FORMBUY">'+
    '<section class="goods-attr">'+
    '<div class="dis-box">'+
    '<label class="g-t-temark">已选</label>'+
    '<div class="box-flex t-goods1" aui-popup-for="production-buy">请选择</div>'+
    '<span class="t-jiantou"><i class="aui-iconfont aui-icon-right"></i></span>'+
    '</div>'+
    '<div class="mask-filter-div"></div>'+
    '</section>'+
    '</form>'+
    '</div>'+
    '</div>'+
    '<div id="n-goods" class="goods-info" style="margin-bottom: 1rem;margin-top:0.1rem;">'+
    '<div class="tab-title">'+
    '<ul class="dis-box">'+
    '<li class="box-flex active">商品描述</li>'+
    '<li class="box-flex">规格参数</li>'+
    '</ul>'+
    '</div>'+
    '<div id="j-tab-con" class="swiper-container-autoheight">'+
    '<div class="swiper-wrapper" style="height: auto;">'+
    '<section class="swiper-slide swiper-slide-prev">'+
    '<div class="padding-all">'+
    '<div class="no-div-message">'+
    '<i class="aui-iconfont aui-icon-info"></i>'+
    '<p>亲，此处没有内容～！</p>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '<section class="swiper-slide goods-info-attr  swiper-slide-next" style="display: none" >'+
    '<div class="padding-all">'+
    '<div class="no-div-message">'+
    '<i class="aui-iconfont aui-icon-info"></i>'+
    '<p>亲，此处没有内容～！</p>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="filter-btn dis-box">'+
    '<span class="filter-btn-flow go-shopCart filter-btn-a">'+
    '<i class="aui-iconfont aui-icon-cart"></i>'+
    '<sup class="b-color" id="total_number">0</sup>'+
    '<em>购物车</em>'+
    '</span>'+
    '<span  data-id="{{id}}" class="btn-cart box-flex">加入购物车</span>'+
    '<span  data-id="{{id}}" class="btn-submit box-flex">立即购买</span>'+
    '</div>'+
    '<div class="aui-popup aui-popup-bottom-left" id="production-buy" style="display: none">'+
    '<div class="show-goods-attr"></div>'+
    '<section class="product-list-small">'+
    '<div class="product-div">'+
    '<img src="/images/{{url}}" alt="" class="product-list-img">'+
    '<div class="product-text">'+
    '<div class="dis-box">'+
    '<h4 class="box-flex">skechers斯凯奇 gowalk时尚女单鞋 超轻舒适豆豆鞋休闲女鞋13514</h4>'+
    '<i class="iconfont icon-guanbi show-div-guanbi"></i>'+
    '</div>'+
    '<p><span class="p-price t-first" id="ECS_GOODS_AMOUNT">￥{{price}}元</span></p>'+
    '<p class="dis-box p-t-remark"><span class="box-flex">库存:{{qty}}</span></p>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '<section class="swiper-container-vertical ">'+
    '<div class="swiper-wrapper">'+
    '<div class="swiper-slide swiper-slide-active">'+
    '<h4 class="t-remark">数量</h4>'+
    '<div class="div-num dis-box">'+
    '<a class="num-less aui-iconfont aui-icon-minus"></a>'+
    '<input class="box-flex" data-qty="{{qty}}" type="text" value="1" name="number" id="goods_number" autocomplete="off">'+
    '<a class="num-plus aui-iconfont aui-icon-plus"></a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '<section class="ect-button-more dis-box">'+
    '<span  data-id="{{id}}" class="btn-cart box-flex joinCart">加入购物车</span>'+
    '<span  data-id="{{id}}" class="btn-submit box-flex buyNow">立即购买</span>'+
    '</section>'+
    '</div>'+
    '</div>'+
    '<div class="n-goods-bg"></div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('body').scrollTop(0);
    var popup = new auiPopup();
    $.get('/count-shopcart',function (res) {
        if(res){
            $('#total_number').text(res[0].total);
        }
    });
    if($("#ECS_COLLECT").data("id")!=''){
        let collection=$("#ECS_COLLECT")
        $.get('/edit-collection',{"type":"show","goodId":collection.data("id")},function (val) {
            if(val!=''&&val!='err'){
                console.log(val)
                collection.addClass("active");
                collection.find('em').text("已收藏");
            }
        });
        $.get('/change-history',{"goodsId":collection.data("id")},function (res) {
            if(res){

            }
        });
    }

    $('.goods-left-jiat .j-nav-box').click(function(){
        let goodsNav=$('.goods-nav');
        goodsNav.hasClass('active')?goodsNav.removeClass('active') :goodsNav.addClass('active')

    });
    $('.goods-left-jiat .aui-icon-left').click(function(){
        backUrl();
    });
    $('.goods-photo').click(function(){
        let goodsNav=$('.goods-photo');
        let goodsBg=$('.n-goods-bg');
        if(goodsNav.hasClass('active')){
            goodsNav.removeClass('active');
            goodsBg.removeClass('active');
        }else{
            goodsNav.addClass('active');
            goodsBg.addClass('active');
        }
    });
    $('#n-goods .tab-title ul li').click(function(){
        let _self=$(this);
        _self.parent().children().removeClass('active');
        _self.addClass('active');
        if(_self.text()=='商品描述'){
            $('.swiper-slide-prev').show();
            $('.swiper-slide-next').hide()
        }else if(_self.text()=='规格参数'){
            $('.swiper-slide-prev').hide();
            $('.swiper-slide-next').show()
        }
    });
    $('.filter-btn .box-flex').click(function(){
        $('.t-goods1').click();
    })

    $('#ECS_COLLECT').click(function () {
        let $this=$(this);
        let goodId=$this.data("id");
        if($this.hasClass("active")){
            $this.removeClass("active");
            $this.find('em').text("收藏");
            $.get('/edit-collection',{"type":"cancel","goodId":goodId},function (val) {
                if(val.affectedRows!=0){
                    toast.success({
                        title:"取消收藏",
                        duration:1000
                    });
                }
            })
        }else{
            $this.addClass("active");
            $this.find('em').text("已收藏");
            $.get('/edit-collection',{"type":"add","goodId":goodId},function (val) {
                if(val.affectedRows!=0){
                    toast.success({
                        title:"收藏成功",
                        duration:1000
                    });
                }
            })
        }
    });
    $('.div-num a').click(function () {
        let $this=$(this);
        if($this.hasClass('aui-icon-minus')){
            if(parseInt($this.next().val())-1<1){
                toast.fail({
                    title:"数量不能小于1",
                    duration:1000
                });
            }else{
                $this.next().val($this.next().val()-1);
            }
        }else if($this.hasClass('aui-icon-plus')){
            if(parseInt($this.prev().val())<parseInt($this.prev().data("qty"))){
                $this.prev().val(parseInt($this.prev().val())+1)
            }else{
                toast.fail({
                    title:"库存不足",
                    duration:1000
                });
            }
        }
    });
    $('.div-num input').change(function () {
        let $this=$(this);
        $this.val(parseInt($this.val()));
        if(parseInt($this.val())<=0){
            $this.val(1)
        }else if(parseInt($this.val())>=parseInt($this.data("qty"))){
            $this.val($this.data("qty"));
            toast.fail({
                title:"库存不足",
                duration:1000
            });
        }
    });
    $('.joinCart').click(function () {
        let $this=$(this);
        $.get('/insert-shopcart',{"goodId":$this.data("id"),"qty":$('.div-num input').val()},function (val) {
            if(val!=''&&val!='err'){
                toast.success({
                    title:"加入购物车成功",
                    duration:1000
                });
                $.get('/count-shopcart',function (res) {
                    if(res){
                        $('#total_number').text(res[0].total);
                        $('footer.aui-bar.aui-bar-tab .aui-badge').text(res[0].total)
                    }
                })
            }else if(val=='err'){
                toast.fail({
                    title:"加入购物车失败",
                    duration:1000
                });
            }
            popup.hide();
        })
    });
    $('.buyNow').click(function () {
        let $this=$(this);
        dialog.alert({
            title:"提示",
            msg:'确定购买该商品么？',
            buttons:['取消','确定']
        },function(ret){
            if(ret.buttonIndex==2){
                loadLib('/make-order',{'goodId':[$this.data('id')]})
            }
        })
    })
    $('.go-shopCart').click(function () {
        loadLib("/shop-cart")
    })

}
