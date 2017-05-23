let template=
    '<div class="flow-checkout">'+
    '<section class="ect-margin-tb ect-padding-lr ect-padding-tb checkout-add">'+
    '<label>'+
    '<p class="title">1<span>15215211512</span></p>'+
    '<p>14</p>'+
    '<i class="aui-iconfont aui-icon-right"></i>'+
    '</label>'+
    '</section>'+
    '<section class="ect-margin-tb ect-padding-lr checkout-select" id="accordion">'+
    '<span class="collapsed">'+
    '<p><b>配送方式</b><span class="label ect-bg-colory">必填</span></p>'+
    '<i class="aui-iconfont aui-icon-down"></i>'+
    '</span>'+
    '<div id="collapseOne" class="panel-collapse collapse in" aria-expanded="false">'+
    '<ul class="ect-radio">'+
    '<li>'+
    '<input class="aui-checkbox" type="checkbox" id="shipping_5" value="1" checked="true" name="shipping">'+
    '<label for="shipping_5">申通快递 [￥0.00元]</label>'+
    '</li>'+
    '<li>'+
    '<input class="aui-checkbox" type="checkbox" id="shipping_2" value="2" checked="true" name="shipping">'+
    '<label for="shipping_2">圆通速递 [￥0.00元]</label>'+
    '</li>'+
    '</ul>'+
    '</div>'+
    '</section>'+
    '<section class="ect-margin-tb ect-padding-lr checkout-select">'+
    '<span class="collapsed">'+
    '<p><b> 订单附言</b></p>'+
    '<i class="aui-iconfont aui-icon-down"></i>'+
    '</span>'+
    '<div id="collapseFive" class="panel-collapse collapse" aria-expanded="false">'+
    '<input name="postscript" type="text" class="fuyan" maxlength="22" placeholder="请输入订单附言">'+
    '</div>'+
    '</section>'+
    '<section class="ect-margin-tb ect-margin-bottom0 ect-padding-lr checkout-select checkout-pro-list">'+
    '<p><b>商品列表</b>'+
    '<ul>'+
    '<li>'+
    '<dl>'+
    '<dt class="pull-left">'+
    'KISSCAT接吻猫2014夏新款女拖鞋一字拖高跟厚底凉拖鞋K33326-07LAf'+
    '</dt>'+
    '<dd class="pull-left list-num">x 1</dd>'+
    '<dd class="pull-right">￥369.00元</dd>'+
    '</dl>'+
    '</li>'+
    '</ul>'+
    '<div class="ect-padding-tb text-right" id="ECS_ORDERTOTAL">'+
    '商品总价:<b class="ect-colory">￥369.00元</b><br>'+
    '应付款金额:<b class="ect-colory">￥369.00元</b><br>'+
    '</div>'+
    '</section>'+
    '<div class="ect-padding-lr ect-padding-tb ect-margin-tb">'+
    '<input type="submit" name="submit" value="订单提交" class="btn btn-info ect-btn-info ect-colorf ect-bg">'+
    '<input type="hidden" name="step" value="done">'+
    '</div>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){

}
CurrentJsLoad();