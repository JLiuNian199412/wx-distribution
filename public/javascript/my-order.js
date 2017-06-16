let template=
    '<div class="ect-pro-list user-order" style="border-bottom:none;">'+
    '<ul id="J_ItemList">'+
    '{{#each List}}'+
    '<li>'+
    '<div class="order-list" data-orderId="{{orderId}}">'+
    '<img src="/images/{{img}}" class="pull-left">'+
    '<dl>'+
    '<dt>'+
    '<h4 class="title">订单号：{{orderNo}}</h4>'+
    '</dt>'+
    '<dd>订单状态：{{status}}</dd>'+
    '<dd>订单总金额：<span class="ect-color">￥{{price}}元</span></dd>'+
    '<dd>下单时间：{{time}}</dd>'+
    '</dl>'+
    '<i class="aui-iconfont aui-icon-right fa"></i>'+
    '</div>'+
    '</li>'+
    '{{/each }}'+
    '</ul>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.order-list').click(function () {
        loadLib('/order-detail',{"orderId":$(this).data("orderid")})
    })
}
