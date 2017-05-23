let template=
    '<div id="box">'+
    '<nav class="shop-info-nav padding-all">'+
    '<ul class="dis-box">'+
    '<li class="box-flex"><span>一级分店</span></li>'+
    '<li class="box-flex"><span>二级分店</span></li>'+
    '<li class="box-flex"><span>三级分店</span></li>'+
    '</ul>'+
    '</nav>'+
    '<section class="padding-all shop-money n-lv-bg">'+
    '<p>总销售额（元）</p>'+
    '<h4>0.00</h4>'+
    '</section>'+
    '<ul class="dis-box shop-nav-two padding-all n-bs-f">'+
    '<li class="box-flex">'+
    '<p>我的分店数</p>'+
    '<h4>1</h4>'+
    '</li>'+
    '<li class="box-flex">'+
    '<p>累计会员数</p>'+
    '<h4>1</h4>'+
    '</li>'+
    '<li class="box-flex">'+
    '<p>累计订单数</p>'+
    '<h4>1</h4>'+
    '</li>'+
    '</ul>'+
    '<section class="padding-all">'+
    '<div class="n-t-a-center">'+
    '<button type="submit" class="n-set-4-submit see-stores"><span class="n-wdfd_content5">查看我的分店</span></button>'+
    '</div>'+
    '<div class="n-t-a-center">'+
    '<button type="button" class="n-set-4-submit n-shop-back n-shop-but">'+
    '<span class="col-lv">返回</span></button>'+
    '</div>'+
    '</a>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.see-stores').click(function () {
        loadLib('/stores-list')
    });
    $('.n-shop-back').click(function () {
        loadLib('/store-manage')
    })

}