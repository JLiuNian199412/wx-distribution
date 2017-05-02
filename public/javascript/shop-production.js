let template=
    '<section class="product-sequence">'+
    '<span class="box-flex a-change">默认</span>'+
    '<span class="box-flex">销量<i class="aui-iconfont aui-icon-down"></i></span>'+
    '<span class="box-flex">人气<i class="aui-iconfont aui-icon-down"></i></span>'+
    '<span class="box-flex active">价格<i class="aui-iconfont aui-icon-down"></i></span>'+
    '</section>'+
    '<section class="aui-grid product-list">'+
    '<div class="aui-row">'+
    '<div class="aui-col-xs-6 product-div">'+
    '<div class="product-content">'+
    '<div class="product-img">'+
    '<img src="/images/product1.jpg" alt="">'+
    '</div>'+
    '<h4>十月结晶孕产妇漱口水月子漱口液 孕妇产褥期产后待产用品250ml</h4>'+
    '<p><span>￥115.00元</span></p>'+
    '</div>'+
    '</div>'+
    '<div class="aui-col-xs-6 product-div">'+
    '<div class="product-content">'+
    '<div class="product-img">'+
    '<img src="/images/product2.jpg" alt="">'+
    '</div>'+
    '<h4>哈优孕妇护肤品套装专用孕妇洗面奶保湿孕妇化妆品套装天然旗舰店</h4>'+
    '<p><span>￥115.00元</span></p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</section>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.aui-pull-right.aui-btn').click(function(){
        $('footer .aui-bar-tab-item .aui-icon-home').click();
    });

    $('#search-input').click(function(){
        sessionStorage.setItem('searchBackUrl','/shop-production');
        loadLib('/search')
    })
}