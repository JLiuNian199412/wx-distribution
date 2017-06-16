let template=
    '<div class="flow-checkout">'+
    '<section class="ect-margin-tb ect-padding-lr ect-padding-tb checkout-add order-address" style="min-height: 2.5rem;">'+
    '<label>'+
    '<p class="title"> <span> </span></p>'+
    '<p> </p>'+
    '<i class="aui-iconfont aui-icon-right"></i>'+
    '</label>'+
    '</section>'+
    '<section class="ect-margin-tb ect-margin-bottom0 ect-padding-lr checkout-select checkout-pro-list">'+
    '<p><b>商品列表</b>'+
    '<ul>'+
    '{{#each List}}'+
    '<li data-cartId="{{cartId}}" data-goodId="{{goodId}}" data-img="{{url}}" class="product-list">'+
    '<dl>'+
    '<dt class="pull-left">'+
    '{{name}}'+
    '</dt>'+
    '<dd class="pull-left list-num" data-num="{{number}}">x {{number}}</dd>'+
    '<dd class="pull-right">￥{{price}}元</dd>'+
    '</dl>'+
    '</li>'+
    '{{/each}}'+
    '</ul>'+
    '<div class="ect-padding-tb text-right" data-price="{{totalPrice}}" id="ECS_ORDERTOTAL">'+
    '商品总价:<b class="ect-colory">￥{{totalPrice}}元</b><br>'+
    '应付款金额:<b class="ect-colory">￥{{totalPrice}}元</b><br>'+
    '</div>'+
    '</section>'+
    '<div class="ect-padding-lr ect-padding-tb ect-margin-tb">'+
    '<input type="submit" name="submit" value="订单提交" class=" submit-order btn btn-info ect-btn-info ect-colorf ect-bg">'+
    '<input type="hidden" name="step" value="done">'+
    '</div>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $.get("/get-address",function (res) {
        if(res&&res!=''){
            let template = Handlebars.compile('<label>'+
                '<p class="title" data-id="{{addressId}}">{{name}}<span>{{phone}}</span></p>'+
                '<p>{{province}}{{city}}{{district}}  {{detail}}</p>'+
                '<i class="aui-iconfont aui-icon-right"></i>'+
                '</label>');
            $('.order-address').html(template(res[0]));
        }else{
            loadLib("/address-list")
        }
    })
    $('.order-address').click(function () {
        loadLib("/address-list")
    })
    $('.submit-order').click(function () {
        let orderInfo={};
        let cartArry=[];
        let numArry=[];
        let goodArry=[];
        var myDate = new Date();
        orderInfo.addressId=$('.order-address .title').data("id");
        orderInfo.price=$('#ECS_ORDERTOTAL').data("price");
        orderInfo.status='待付款';
        orderInfo.img=$('.product-list').eq(0).data("img");
        orderInfo.time= myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+ myDate.getDate()+' '+
            myDate.getHours()+':'+ myDate.getMinutes()+':'+ myDate.getSeconds();
        orderInfo.orderNo= myDate.getFullYear()+''+(myDate.getMonth()+1)+myDate.getDate()+myDate.getHours()+ myDate.getMinutes()+myDate.getSeconds();
        $.each($('.product-list'),function (_,v) {
            cartArry[_]=$('.product-list').eq(_).data("cartid");
            numArry[_]=$('.product-list').eq(_).find(".list-num").data("num");
            goodArry[_]=$('.product-list').eq(_).data("goodid");
            if(_==$('.product-list').length-1){
                orderInfo.cartId=cartArry;
                orderInfo.goods=goodArry.join(",");
                orderInfo.num=numArry.join(",");
                $.get("/insert-order",{"orderInfo":orderInfo},function (val) {
                    if(val==true){
                        toast.success({
                            title:"订单生成成功",
                            duration:1000
                        });
                        $.get('/count-shopcart',function (res) {
                            if(res){
                                $('footer.aui-bar.aui-bar-tab .aui-badge').text(res[0].total)
                            }
                        })
                    }else if(val==false){
                        toast.fail({
                            title:"订单生成失败",
                            duration:1000
                        });
                    }
                    let goodInfo={};
                    goodInfo.list=[];
                    $.each(goodArry,function (_,v) {
                        goodInfo.list[_]={};
                        goodInfo.list[_].goodId=v;
                        goodInfo.list[_].num= numArry[_]
                    })
                    $.get('update-goods',{"goodInfo":goodInfo},function (val) {
                        if(val&&val.affectedRows>0){

                            loadLib('/shop-cart');
                        }else{
                            toast.fail({
                                title:"订单生成失败",
                                duration:1000
                            });
                        }

                    })
                })
            }
        });

    })
}
CurrentJsLoad();