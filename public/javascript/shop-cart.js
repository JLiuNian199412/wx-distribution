let template=
        '<div class="con">'+
        '{{#if List}}'+
        '<div class="o-t-good">'+
        '<div class="flow-price">'+
        '<div class="shop-tips">'+
        'touch微分销'+
        '</div>'+
        '<div class="select-all">'+
        '<label><input class="aui-checkbox check-all" type="checkbox" name="demo"></label>'+
        '<span>全选</span>'+
        '</div>'+
        '</div>'+
        '<section class="ect-pro-list">'+
        '<ul>'+
        '{{#each List}}'+
        '<li class="n-flow1-box">'+
        '<div class="j-chack-box n-flow-ckecked">'+
        '<div class="chack-input-box">'+
        '<label><input class="aui-checkbox check-item" type="checkbox" data-cartId="{{cartId}}" ></label>'+
        '</div>'+
        '</div>'+
        '<div class="n-flow-right-sum">'+
        '<div class="ect-clear-over">'+
        '<span ><img src="/images/{{url}}" ></span>'+
        '<dl>'+
        '<dt><h4 class="title"><span>{{name}}</span></h4></dt>'+
        '<dd class="ect-color999">'+
        '<p></p>'+
        '<p><strong class="ect-colory">￥{{price}}元</strong></p>'+
        '</dd>'+
        '</dl>'+
        '</div>'+
        '<div class="flow-num-del">'+
        '<div class="input-group wrap">'+
        '<span class="input-group-addon minus">-</span>'+
        '<input type="text" class="form-contro"  data-cartId="{{cartId}}" data-goodId="{{id}}" data-qty="{{qty}}" data-price="{{price}}" name="goodsQty" value="{{goodsQty}}">'+
        '<span class="input-group-addon plus">+</span>'+
        '</div>'+
        '<div class="pull-right">'+
        '<span data-cartId="{{cartId}}" class="aui-iconfont aui-icon-trash"></span>'+
        '</div>'+
        '</div>'+
        '</div>'+
        '</li>'+
        '{{/each}}'+
        '</ul>'+
        '</section>'+
        '<div class="price-tips">'+
        '共<b id="total_number">0</b>件商品,总价(不含运费):<b class="ect-colory" id="goods_subtotal">￥0元</b>'+
        '</div>'+
        '<div class="flow-jiesuan" style="background: #f7f7f7;">'+
        '<span class="btn-info confirm-to-pay">立即结算</span>'+
        '</div>'+
        '</div>'+
        '{{else}}'+
        '<div class="o-t-error">'+
        '<div class="img">'+
        '<img src="./images/TB-shop-cart.png">'+
        '</div>'+
        '<div class="info">'+
        '<h1 class="title">购物车快饿瘪了T.T</h1>'+
        '<p class="sub">主人快给我挑点宝贝吧</p>'+
        '<p class="btn">'+
        '<span class="go-shop">去逛逛</span>'+
        '</p>'+
        '</div>'+
        '{{/if}}'+
        '</div>'+
        '</div>';
localStorage.setItem('template',template)
function CurrentJsLoad(){
    $('.go-shop').click(function () {
        loadLib('/shop')
    });
    sessionStorage.removeItem("makeOrder");
    function showTotal() {
        let good=$('.form-contro.active');
        let totalQty=0;
        let totalPrice=0;
        if(good&&good!=''&&good.length>0){
            $.each(good,function (_,v) {
                totalQty+=parseInt(good.eq(_).val());
                totalPrice+=parseInt(good.eq(_).val())*parseInt(good.eq(_).data("price"));
                if(_==good.length-1){
                    $("#total_number").text(totalQty);
                    $("#goods_subtotal").text('￥'+totalPrice+'元');
                }
            })
        }else{
            $("#total_number").text(totalQty);
            $("#goods_subtotal").text('￥'+totalPrice+'元');
        }
    }
    $('span.input-group-addon').click(function () {
        let $this=$(this);
        if($this.hasClass('minus')){
            if(parseInt($this.next().val())-1<1){
                toast.fail({
                    title:"数量不能小于1",
                    duration:1000
                });
            }else{
                $this.next().val($this.next().val()-1);
            }
        }else if($this.hasClass('plus')){
            if(parseInt($this.prev().val())<parseInt($this.prev().data("qty"))){
                $this.prev().val(parseInt($this.prev().val())+1)
            }else{
                toast.fail({
                    title:"库存不足",
                    duration:1000
                });
            }
        }
        showTotal();
    });
    $('input.form-contro').change(function () {
        let $this=$(this);
        $this.val(parseInt($this.val()));
        if($this.val()<=0||$this.val()=='NaN'){
            $this.val(1)
        }else if($this.val()>=$this.data("qty")){
            $this.val($this.data("qty"));
            toast.fail({
                title:"库存不足",
                duration:1000
            });
        }
        showTotal();
    });
    $('.check-all.aui-checkbox').click(function () {
            let $this=$(this)
            if($this.prop("checked")==true){
                $('.aui-checkbox').prop("checked",true);
                $('.form-contro').addClass("active");

            }else{
                $('.aui-checkbox').prop("checked",false);
                $('.form-contro').removeClass("active");
            }
            showTotal();
    });
    $('.check-item.aui-checkbox').click(function () {
        let checkItem=$('.check-item.aui-checkbox');
        let checked=true;
        let $this=$(this);
        if($this.prop("checked")==true){
            $this.parent().parent().parent().next().find('.form-contro').addClass("active");
        }else if($this.prop("checked")==false){
            $this.parent().parent().parent().next().find('.form-contro').removeClass("active");
        }
        $.each(checkItem,function (_,v) {
            if(checkItem.eq(_).prop("checked")==false){
                checked=false;
            }
        });
        showTotal();
        $('.check-all.aui-checkbox').prop("checked",checked)
    })
    $('.aui-iconfont.aui-icon-trash').click(function () {
        let $this=$(this);
        dialog.alert({
            title:"提示",
            msg:'确定删除该商品？',
            buttons:['取消','确定']
        },function(ret){
            if(ret.buttonIndex==2){
                $.get('/delete-shopcart',{"cartId": $this.data("cartid")},function (val) {
                        if(val.affectedRows>0){
                            $this.parent().parent().parent().parent().remove();
                            showTotal();
                            $.get('/count-shopcart',function (res) {
                                if(res){
                                    $('footer.aui-bar.aui-bar-tab .aui-badge').text(res[0].total)
                                }
                            })
                            toast.success({
                                title:"已删除",
                                duration:1000
                            });
                        }
                })
            }
        });
    })
    $('.confirm-to-pay').click(function () {
        let good=$('.form-contro.active');
        let goodsGroup=[];
        if(good&&good!=''&&good.length>0){
            $.each(good,function (_,v) {
                goodsGroup[_]={};
                goodsGroup[_].cartId=good.eq(_).data('cartid');
                goodsGroup[_].goodId=good.eq(_).data('goodid');
                goodsGroup[_].number=good.eq(_).val();
            });
            loadLib('/make-order',{"goods":goodsGroup});
            sessionStorage.setItem("makeOrder",JSON.stringify(goodsGroup))
        }else{
            toast.fail({
                title:"请选择购买的商品",
                duration:1000
            });
        }

    })
}
