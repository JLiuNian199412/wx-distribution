$(function(){
    $('.aui-pull-right.aui-btn').click(function(){
        loadLib('/users/login');
    });
    var slide = new auiSlide({
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
    let template=' <div id="aui-slide"> <div class="aui-slide-wrap" > <div class="aui-slide-node bg-dark"> <img src="/images/slide1.png" /> </div> <div class="aui-slide-node bg-dark"> <img src="/images/slide2.png" /> </div> <div class="aui-slide-node bg-dark"> <img src="/images/slide3.png" /> </div> </div> <div class="aui-slide-page-wrap"><!--分页容器--></div> </div> <section class="aui-grid"> <div class="aui-row"> <div class="aui-col-xs-3"> <img src="/images/nav_0.png" alt="" class="index_nav"> <div class="aui-grid-label">全部分类</div> </div> <div class="aui-col-xs-3"> <img src="/images/nav_1.png" alt="" class="index_nav"> <div class="aui-grid-label">促销活动</div> </div> <div class="aui-col-xs-3"> <img src="/images/nav_2.png" alt="" class="index_nav"> <div class="aui-grid-label">热门搜索</div> </div> <div class="aui-col-xs-3"> <img src="/images/nav_3.png" alt="" class="index_nav"> <div class="aui-grid-label">我的订单</div> </div> </div> </section> <section class="aui-grid"> <div class="aui-row"> <div class="aui-col-xs-6 index-theme-icon"> <img src="/images/index-theme-icon1.gif" alt=""> </div> <div class="aui-col-xs-6 index-theme-icon"> <img src="/images/index-theme-icon2.gif" alt=""> </div> <div class="aui-col-xs-6 index-theme-icon"> <img src="/images/index-theme-icon3.gif" alt=""> </div> <div class="aui-col-xs-6 index-theme-icon"> <img src="/images/index-theme-icon4.gif" alt=""> </div> </div> </section> <div class="n-cate-box"> <p class="index-title"><i class="iconfont icon-cainixihuan is-cainixihuan"></i>猜你喜欢</p> <p class="index-small-title">实时推荐最适合您的宝贝</p> </div> <section class="aui-grid product-list"> <div class="aui-row"> <div class="aui-col-xs-6 product-div"> <div class="product-content"> <div class="product-img"> <img src="/images/product1.jpg" alt=""> </div> <h4>十月结晶孕产妇漱口水月子漱口液 孕妇产褥期产后待产用品250ml</h4> <p><span>￥115.00元</span></p> </div> </div> <div class="aui-col-xs-6 product-div"> <div class="product-content"> <div class="product-img"> <img src="/images/product2.jpg" alt=""> </div> <h4>哈优孕妇护肤品套装专用孕妇洗面奶保湿孕妇化妆品套装天然旗舰店</h4> <p><span>￥115.00元</span></p> </div> </div> <div class="aui-col-xs-6 product-div"> <div class="product-content"> <div class="product-img"> <img src="/images/product3.jpg" alt=""> </div> <h4>孕亲 孕妇专用护肤品旗舰店 孕妇护肤品纯天然化妆品补水保湿套装</h4> <p><span>￥115.00元</span></p> </div> </div> <div class="aui-col-xs-6 product-div"> <div class="product-content"> <div class="product-img"> <img src="/images/product4.jpg" alt=""> </div> <h4>萃芙理 孕妇橄榄油 妊娠纹产前后消除预防修复产妇专用护肤化妆品</h4> <p><span>￥115.00元</span></p> </div> </div> </div> </div> </section>'
    localStorage.setItem('template',template)
});