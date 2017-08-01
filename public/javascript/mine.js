let template=
    '<div class="con">'+
    '<div class="my-admin-header-box">'+
    '<div class="admin-bg-box">'+
    '<div class="my-user-box com-header">'+
    '<div class="padding-all dis-box">'+
    '<div class="user-head-img-box">'+
    '<img src={{userIcon}}>'+
    '</div>'+
    '<div class="box-flex">'+
    '<div class="g-s-i-title-a">'+
    '<h4 class="ellipsis-one user-admin-size">{{name}}</h4>'+
    '<p class="user-reg-top">您的等级是 {{type}}</p>'+
    '</div>'+
    '</div> '+
    '<div class="user-right-maxbox">'+
    '<div class="user-right-box">'+
    '<i class="aui-iconfont aui-icon-gear is-shezi my-user-right-cont" style="display:block;"></i>'+
    '<p class="my-user-right-cont"><span class="my-t-remark color-whie">设置</span></p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="my-nav-box my-shoucang-bg">'+
    '<div class="user-nav-box dis-box">'+
    '<div class="box-flex mine-my-collection">'+
    '<h4 class="ellipsis-one">{{countCollection}}</h4>'+
    '<p class="t-remark3">收藏</p>'+
    '</div>'+
    '<div class="box-flex">'+
    '<h4 class="ellipsis-one"> 0</h4>'+
    '<p class="t-remark3">消息</p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<section class="b-color-f my-nav-box m-top10">'+
    '<div class="dis-box padding-all my-bottom my-all-order">'+
    '<h3 class="box-flex my-u-title-size"><i class="aui-iconfont aui-icon-calendar is-user-size"></i>我的订单</h3>'+
    '<div class="box-flex t-goods1 ">全部订单</div>'+
    '<span class="t-jiantou"><i class="aui-iconfont aui-icon-right"></i></span>'+
    '</div>'+
    '<ul class="user-money-list dis-box my-dingdan">'+
    '<span class="box-flex">'+
    '<li>'+
    '<h4 class="ellipsis-one"><i class="aui-iconfont aui-icon-cert my-img-size"></i></h4>'+
    '<p class="t-remark3">待付款</p>'+
    '<div class="aui-badge">0</div>'+
    '</li>'+
    '</span>'+
    '<span class="box-flex">'+
    '<li>'+
    '<h4 class="ellipsis-one"><i class="aui-iconfont aui-icon-flag my-img-size"></i></h4>'+
    '<p class="t-remark3">待收货</p>'+
    '<div class="aui-badge">0</div>'+
    '</li>'+
    '</span>'+
    '<span class="box-flex">'+
    '<li>'+
    '<h4 class="ellipsis-one"><i class="aui-iconfont aui-icon-refresh my-img-size"></i></h4>'+
    '<p class="t-remark3">退/换货</p>'+
    '</li>'+
    '</span>'+
    '</ul>'+
    '</section>'+
    '<section class="b-color-f user-fu-box m-top10">'+
    '<div class="b-color-f dis-box">'+
    '<span class="box-flex">'+
    '<i class="aui-iconfont aui-icon-question"></i>'+
    '<p class="f-03 col-6">客服服务</p>'+
    '</span>'+
    '<span class="box-flex">'+
    '<i class="aui-iconfont aui-icon-home"></i>'+
    '<p class="f-03 col-6">我的微店</p>'+
    '</span>'+
    '</div>'+
    '</section>'+
    '<section class="m-top10 my-nav-box">'+
    '<div class="dis-box padding-all b-color-f">'+
    '<h3 class="box-flex  my-u-title-size">'+
    '<i class="aui-iconfont aui-icon-date is-user-size"></i>浏览记录'+
    '</h3>'+
    '<span class="n-shanchutupian">'+
    '<i class="aui-iconfont aui-icon-trash"></i>'+
    '<span class="q-title">清空</span>'+
    '</span>'+
    '</div>'+
    '<section class="goods-shop-pic padding-all b-color-f">'+
    '<div class="swiper-container-horizontal product-one-list1">'+
    '<div class="swiper-wrapper " style="overflow:auto;">'+
    '{{#each historyList}}'+
    '<li class="swiper-slide swiper-slide-active product-li" data-id="{{id}}">'+
    '<div class="product-div">'+
    '<span class="product-div-link" ></span>'+
    '<img class="product-list-img" src="/images/{{url}}">'+
    '<div class="product-text">'+
    '<h4>{{name}}</h4>'+
    '<p style="display:none"><span class="p-price t-first ">价格：¥{{price}}</span></p>'+
    '</div>'+
    '</div>'+
    '</li>'+
    '{{/each }}'+
    '</div>'+
    '</div>'+
    '</section>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.mine-my-collection').click(function () {
        loadLib('/my-collection')
    });
    $('.my-all-order').click(function () {
        loadLib('/my-order')
    });
    $('.user-head-img-box').click(function () {
        loadLib('/person-info');
    })
    $('.user-right-box').click(function () {
        loadLib('/person-info');
    })
    $('.product-li').click(function () {
        $this=$(this);
        let goodId=$this.data("id");
        loadLib('/production-detail',{"goodsId":goodId});
        sessionStorage.setItem("product-goodsId",goodId);
    })
    $('.n-shanchutupian').click(function () {
        $.get("/delete-history",function (val) {
            if(val.affectedRows!=0){
                toast.success({
                    title:"已清空",
                    duration:1000
                });
                loadLib('/mine')
            }
        })
    })
    // $.get('/count-collection',function (res) {
    //     if(res){
    //         $('.mine-my-collection h4').text(res[0].total)
    //     }
    // })
}