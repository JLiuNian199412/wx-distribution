let template=
    '<div id="box">'+
    '<header class="dis-box padding-all open-header-bg">'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x active"></div>'+
    '<div class="header-y p-a o-hs-bg active"><span class="text-c color-whie f-03">1</span></div>'+
    '</div>'+
    '<label class="o-hs active">设置微店信息</label>'+
    '</div>'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x active"></div>'+
    '<div class="header-y p-a o-hs-bg active"><span class="text-c color-whie f-03">2</span></div>'+
    '</div>'+
    '<label class="o-hs active">设置分类信息</label>'+
    '</div>'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x active"></div>'+
    '<div class="header-y p-a o-hs-bg active"><span class="text-c color-whie f-03">3</span></div>'+
    '</div>'+
    '<label class="o-hs active">完成</label>'+
    '</div>'+
    '</header>'+
    '<section class="padding-all">'+
    '<div class="padding-all huang-bg n-ti-bg open-two-box b-r">'+
    '<h4 class="n-set3_list2">注册成功！请保存以下信息：</h4>'+
    '<p class="f-03 n-set_list"><span>微店地址：<br><span class="n-set-url"></span></span></p>'+
    '</div>'+
    '<div class="n-con-sale">'+
    '<h4 class="f-07 col-4 m-t05">新手必读</h4>'+
    '<p class="col-6 f-03 m-t ">' +
    '1.开微店收入来源一： 您已成功注册微店，已经取得整座商城的商品销售权，只要有人在您的微店购物，即可获得8%-20%的佣金 ' +
    '2.开微店收入来源二： 邀请朋友注册，Ta就成为您的分销商，Ta店内销售，您可以获得5%-10%的奖励，分销商越多，您赚的越多！ ' +
    '3.开微店收入来源三： 您下级分销商所发展的分销商店内销售，您也可以获得3%-5%的奖励！</p>'+
    '</div>'+
    '<div class="n-but-box n-lv-bg  b-r">'+
    '<span class="text-c color-whie f-08 n-set-4-submit">进入我的微店</span>'+
    '</div>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    let url=URL.host+'?'+URL.param();
    $('.n-set-url').text(url);
    $('.n-set-4-submit').click(function () {
        loadLib('/store')
    })
}
