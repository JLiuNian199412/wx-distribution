let template=
    '<div id="box">'+
    '<section class="n-lv-bg n-shop-deta-header">'+
    '<div class="n-shop-deta-img">'+
    '<img class="index_image2" src="/v2/data/assets/images/get_avatar.png">'+
    '</div>'+
    '<h4 class="f-07 color-whie text-c p-t1">ECTouch微分销a</h4>'+
    '<p class="f-03 color-whie text-c p-t05">liunian1</p>'+
    '<p class="f-03 color-whie text-c">15736471623</p>'+
    '</section>'+
    '<div class="padding-all text-c col-7 f-01  n-b-b">'+
    '<time>时间：2017-05-18 15:52:07</time>'+
    '</div>'+
    '<section>'+
    '<ul class="dis-box padding-all n-bs-f n-b-b">'+
    '<li class="box-flex"><span class="f-07 col-6">累计销售额</span></li>'+
    '<li class="box-flex"><span class="f-r col-lv f-06">0.00元</span></li>'+
    '</ul>'+
    '</section>'+
    '<section class="m-t006">'+
    '<ul class="dis-box padding-all n-bs-f n-b-b">'+
    '<li class="box-flex"><span class="f-07 col-6">累计订单</span></li>'+
    '<li class="box-flex"><span class="f-r col-lv f-06">0</span></li>'+
    '</ul>'+
    '<ul class="dis-box padding-all n-bs-f n-b-b">'+
    '<li class="box-flex"><span class="f-07 col-6">累计分店</span></li>'+
    '<li class="box-flex"><span class="f-r col-lv f-06">0</span></li>'+
    '</ul>'+
    '<ul class="dis-box padding-all n-bs-f n-b-b">'+
    '<li class="box-flex"><span class="f-07 col-6">累计会员</span></li>'+
    '<li class="box-flex"><span class="f-r col-lv f-06">0</span></li>'+
    '</ul>'+
    '</section>'+
    '<section class="padding-all">'+
    '<button type="button" class="n-set-4-back"><span class="n-wdfd_content5">返回</span></button>'+
    '</section>' +
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.n-set-4-back').click(function () {
        loadLib('/stores-list')
    })
}
