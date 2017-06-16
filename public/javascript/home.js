let template=
    '<div id="aui-slide">' +
    '<div class="aui-slide-wrap" >' +
    '<div class="aui-slide-node bg-dark">' +
    '<img src="/images/slide1.png" />' +
    '</div>' +
    '<div class="aui-slide-node bg-dark">' +
    '<img src="/images/slide2.png" />' +
    '</div>' +
    '<div class="aui-slide-node bg-dark">' +
    '<img src="/images/slide3.png" />' +
    '</div>' +
    '</div>' +
    '<div class="aui-slide-page-wrap"><!--分页容器-->' +
    '</div>' +
    '</div>' +
    '<section class="aui-grid">' +
    '<div class="aui-row">' +
    '<div class="aui-col-xs-3 home-all">' +
    '<img src="/images/nav_0.png" alt="" class="index_nav">' +
    '<div class="aui-grid-label">全部分类</div>' +
    '</div>' +
    '<div class="aui-col-xs-3">' +
    '<img src="/images/nav_1.png" alt="" class="index_nav">' +
    '<div class="aui-grid-label">促销活动</div>' +
    '</div>' +
    '<div class="aui-col-xs-3 home-hot-search">' +
    '<img src="/images/nav_2.png" alt="" class="index_nav">' +
    '<div class="aui-grid-label">热门搜索</div>' +
    '</div>' +
    '<div class="aui-col-xs-3 home-my-order">' +
    '<img src="/images/nav_3.png" alt="" class="index_nav">' +
    '<div class="aui-grid-label">我的订单</div>' +
    '</div>' +
    '</div>' +
    '</section>' +
    '<section class="aui-grid">' +
    '<div class="aui-row">' +
    '<div class="aui-col-xs-6 index-theme-icon">' +
    '<img src="/images/index-theme-icon1.gif" alt="">' +
    '</div>' +
    '<div class="aui-col-xs-6 index-theme-icon">' +
    '<img src="/images/index-theme-icon2.gif" alt="">' +
    '</div>' +
    '<div class="aui-col-xs-6 index-theme-icon">' +
    '<img src="/images/index-theme-icon3.gif" alt="">' +
    '</div>' +
    '<div class="aui-col-xs-6 index-theme-icon">' +
    '<img src="/images/index-theme-icon4.gif" alt="">' +
    '</div>' +
    '</div>' +
    '</section>' +
    '<div class="n-cate-box">' +
    '<p class="index-title"><i class="iconfont icon-cainixihuan is-cainixihuan"></i>猜你喜欢</p>' +
    '<p class="index-small-title">实时推荐最适合您的宝贝</p>' +
    '</div>' +
    '<section id="product-like" class="aui-grid product-list">' +
    '</section>';
localStorage.setItem('template',template);
if($('#aui-slide')){
    CurrentJsLoad();
}
function CurrentJsLoad(){
    $('.aui-dialog').remove();
    // function openDialog(type){
    //     switch (type) {
    //         case "text":
    //             dialog.alert({
    //                 title: "弹出提示",
    //                 msg: '这里是内容',
    //                 buttons: ['取消', '确定']
    //             }, function (ret) {
    //                 console.log(ret)
    //             })
    //             break;
    //
    //     }
    // }
    $.get('/people-like',function(result){
        let option={};
        option.result=result;
        let str='<div class="aui-row">' +
            '{{#each result}}' +
            '<div class="aui-col-xs-6 product-div" data-id="{{id}}">' +
            '<div class="product-content">' +
            '<div class="product-img">' +
            '<img src="/images/{{url}}" alt="">' +
            '</div>' +
            '<h4>{{name}}</h4>' +
            '<p><span>￥{{price}}元</span></p>' +
            '</div>' +
            '</div>' +
            '{{/each}}' +
            '</div>';
        let template2 = Handlebars.compile(str);
        $('#product-like').html(template2(option));
        $('.product-div').click(function(){
            loadLib('/production-detail',{'goodsId':$(this).data("id")});
        })
    });
    let slide = new auiSlide({
        container:document.getElementById("aui-slide"), //容器
        // "width":300, //宽度
        "height":184, //高度
        "speed":500, //速度
        "autoPlay": 3000, //自动播放
        "loop":true,//是否循环
        "pageShow":true,//是否显示分页器
        "pageStyle":'dot', //分页器样式，分dot,line
        'dotPosition':'center' //当分页器样式为dot时控制分页器位置，left,center,right
    });
    $('#search-input').click(function(){
        sessionStorage.setItem('searchBackUrl','/home');
        loadLib('/search')
    });
    $('.home-all').click(function(){
        sessionStorage.setItem('indexProduct',true);
        sessionStorage.removeItem('shopSort');
        sessionStorage.removeItem('sortDirection');
        sessionStorage.removeItem('searchContent');
        loadLib('/shop-production')
    });
    $('.home-hot-search').click(function(){
        loadLib('/search')
    });
    $('.home-my-order').click(function(){
        loadLib('/my-order')
    });
}
