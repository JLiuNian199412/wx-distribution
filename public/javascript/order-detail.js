let template=
    '<div class="con">'+
    '<section class="user-order-detail">'+
    '<div class="user-order">'+
    '<p>订单状态：<span class="order-status">{{status}}</span></p>'+
    '<p>订单号：<span>{{orderNo}}</span></p>'+
    '<p>订单总金额：<span>￥{{price}}元</span></p>'+
    '<p>下单时间：<span>{{time}}</span></p>'+
    '</div>'+
    '<section class="ect-padding-tb ect-margin-tb ect-margin-bottom0">'+
    '<div>'+
    '<span class="btn btn-info ect-btn-info ect-colorf ect-bg now-to-pay" data-id="{{orderId}}" >立即付款</span>'+
    '</div>'+
    '</section>'+
    '<div class="ect-pro-list">'+
    '<ul>'+
    '{{#each goodDetail}}'+
    '<li>'+
    '<span><img src="/images/{{url}}"></span>'+
    '<dl>'+
    '<dt>'+
    '<h4 class="title">{{name}}</h4>'+
    '</dt>'+
    '<dd class="dd-price"><b></b></dd>'+
    '<dd class="dd-price"><b>小计：<label class="ect-colory">￥{{totalPrice}}元</label> 数量：{{number}}</b></dd>'+
    '<dd class="dd-price raise-order-box">'+
    '</dd>'+
    '</dl>'+
    '</li>'+
    '{{/each }}'+
    '</ul>'+
    '</div>'+
    '</section>'+
    '<div class="two-btn ect-padding-tb ect-padding-lr ect-margin-tb text-center" style="padding-left: 0.36rem;padding-right: 0.36rem">'+
    '<span class="btn btn-info ect-colorf ect-bg cancel-order" data-id="{{orderId}}">取消订单</span>'+
    '</div>'+
    '<section class="order-detail-info ect-margin-tb">'+
    '<ul>'+
    '<li>收货人姓名：<b>{{name}}</b></li>'+
    '<li>手机：<b>{{phone}}</b></li>'+
    '<li>详细地址：<b>{{province}}{{city}}{{district}} {{detail}}</b></li>'+
    '</ul>'+
    '</section>'+
    '<section class="order-detail-info ect-margin-tb ect-margin-bottom0 user-bottom0">'+
    '<ul style="margin-bottom: 2rem;">'+
    '<li>缺货处理：<b>等待所有商品备齐后再发</b></li>'+
    '</ul>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    if($('.order-status').text()!='待付款'){
        $('.now-to-pay').hide();
    }
    if($('.order-status').text()=='已完成'||$('.order-status').text()=='已取消'){
        $('.cancel-order').hide();
    }
    $('.now-to-pay').click(function () {

        $.get('/update-order',{"orderId": $(this).data('id'),"status":"已付款"},function (val) {
            if(val.affectedRows>0){
                toast.success({
                    title:"付款成功",
                    duration:1000
                });
                loadLib("/my-order")
            }
        })
    });
    $('.cancel-order').click(function () {
        $.get('/update-order',{"orderId": $(this).data('id'),"status":"已取消"},function (val) {
            if(val.affectedRows>0){
                toast.success({
                    title:"取消成功",
                    duration:1000
                });
                loadLib("/my-order")
            }
        })
    })

}
