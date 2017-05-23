let template=
    '<div id="box">'+
    '<div class="store-info">' +
    '<div class="padding-all n-bs-f n-b-b">'+
    '<h4 class="f-06 col-4"><span class="col-7">店名：</span>ECTouch微分销a<i class="aui-iconfont aui-icon-right is-user-jt f-r"></i></h4>'+
    '<p class="f-02 col-7">时间：2017-05-18 17:01:31</p>'+
    '</div>'+
    '<div class="store-info">' +
    '<div class="padding-all n-bs-f n-b-b">'+
    '<h4 class="f-06 col-4"><span class="col-7">店名：</span>ECTouch微分销a<i class="aui-iconfont aui-icon-right is-user-jt f-r"></i></h4>'+
    '<p class="f-02 col-7">时间：2017-05-18 17:01:31</p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<section class="padding-all">'+
    '<button type="button" class="n-set-4-back"><span class="n-wdfd_content5">返回</span></button>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.store-info').click(function () {
        loadLib('/store-detail')
    })
    $('.n-set-4-back').click(function () {
        loadLib('/my-stores')
    })

}
