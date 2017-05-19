let template=
    '<div class="con">'+
    '<div class="index-main comWidth">'+
    '<div class="share-div">'+
    '<img src="images/share-index.png">'+
    '</div>'+
    '<div class="ect-index-header">'+
    '<div class="ect-index-info ">'+
    '<div class="ect-index-detail">'+
    '<img src="/images/get_avatar.png">'+
    '</div>'+
    '<div class="ect-index-name">'+
    '<h1>ss</h1>'+
    '</div>'+
    '</div>'+
    '<img src="/images/index_bg.jpg" class="fl">'+
    '</div>'+
    '<div class="ect-index-menu">'+
    '<ul>'+
    '<li></li>'+
    '<li>'+
    '<span>'+
    '<h3>27</h3>'+
    '<h4>上新</h4>'+
    '</span>'+
    '</li>'+
    '<li>'+
    '<span>'+
    '<h3>1</h3>'+
    '<h4>促销</h4>'+
    '</span>'+
    '</li>'+
    '<li class="ect-index-share">'+
    '<span>'+
    '<div class="ect-index-menu-share">'+
    '<div class="menu-share-pic"></div>'+
    '</div>'+
    '<h4>分享</h4>'+
    '</span>'+
    '</li>'+
    '</ul>'+
    '</div>'+
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
    '<div class="aui-col-xs-6 product-div">'+
    '<div class="product-content">'+
    '<div class="product-img">'+
    '<img src="/images/product3.jpg" alt="">'+
    '</div>'+
    '<h4>孕亲 孕妇专用护肤品旗舰店 孕妇护肤品纯天然化妆品补水保湿套装</h4>'+
    '<p><span>￥115.00元</span></p>'+
    '</div>'+
    '</div>'+
    '<div class="aui-col-xs-6 product-div">'+
    '<div class="product-content">'+
    '<div class="product-img">'+
    '<img src="/images/product4.jpg" alt="">'+
    '</div>'+
    '<h4>萃芙理 孕妇橄榄油 妊娠纹产前后消除预防修复产妇专用护肤化妆品</h4>'+
    '<p><span>￥115.00元</span></p>'+
    '</div>'+
    '</div>'+
    '<div class="aui-col-xs-6 product-div">'+
    '<div class="product-content">'+
    '<div class="product-img">'+
    '<img src="/images/product14.jpg" alt="">'+
    '</div>'+
    '<h4>Samsung/三星 G9008W</h4>'+
    '<p><span>￥4099.00元</span></p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '</div>'+
    '<div class="aui-bar aui-bar-tab" id="store_footer">'+
    '<div class="aui-bar-tab-item">'+
    '<i class="aui-iconfont aui-icon-home"></i>'+
    '<div class="aui-bar-tab-label">首页</div>'+
    '</div>'+
    '<div class="aui-bar-tab-item">'+
    '<i class="aui-iconfont aui-icon-share"></i>'+
    '<div class="aui-bar-tab-label">分类</div>'+
    '</div>'+
    '<div class="aui-bar-tab-item">'+
    '<i class="aui-iconfont aui-icon-search"></i>'+
    '<div class="aui-bar-tab-label">搜索</div>'+
    '</div>'+
    '<div class="aui-bar-tab-item">'+
    '<div class="aui-badge">99</div>'+
    '<i class="aui-iconfont aui-icon-cart"></i>'+
    '<div class="aui-bar-tab-label">购物车</div>'+
    '</div>'+
    '<div class="aui-bar-tab-item">'+
    '<i class="aui-iconfont aui-icon-star"></i>'+
    '<div class="aui-bar-tab-label">微店管理</div>'+
    '</div>'+
    '</div>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    // loadLib('/sale_1');
    let share_div=$('.share-div')
    share_div.click(function () {
        share_div.removeClass('active');
    });
    $('.ect-index-share').click(function () {
        share_div.addClass('active');
    });
    let store_footer=$('#store_footer').children('.aui-bar-tab-item');
    store_footer.eq(0).click(function () {
        loadLib('/home');
    });
    store_footer.eq(1).click(function () {
        loadLib('/shop');
    });
    store_footer.eq(2).click(function () {
        sessionStorage.setItem('searchBackUrl','/store');
        loadLib('/search');
    });
    store_footer.eq(3).click(function () {
        loadLib('/shop-cart');
    });
    store_footer.eq(4).click(function () {
        loadLib('/store-manage');
    });
}
