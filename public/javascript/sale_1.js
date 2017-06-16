let template=
    '<div id="box">'+
    '<div class="dis-box padding-all open-header-bg">'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x active"></div>'+
    '<div class="header-y p-a o-hs-bg active"><span class="text-c color-whie f-03">1</span></div>'+
    '</div>'+
    '<label class="o-hs active">设置微店信息</label>'+
    '</div>'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x"></div>'+
    '<div class="header-y p-a o-hs-bg"><span class="text-c color-whie f-03">2</span></div>'+
    '</div>'+
    '<label class="o-hs">设置分类信息</label>'+
    '</div>'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x"></div>'+
    '<div class="header-y p-a o-hs-bg"><span class="text-c color-whie f-03">3</span></div>'+
    '</div>'+
    '<label class="o-hs">完成</label>'+
    '</div>'+
    '</div>'+
    '<section class="padding-all m-t ">'+
    '<div class="n-sale-set-box">'+
    '<h4 class="f-07 col-3">店铺名称:<span class="f-02 col-8">例：天使试衣间</span></h4>'+
    '<div class="n-sale-input">'+
    '<input type="text" name="data[shop_name]" id="shop_name" placeholder="请输入您的店名" value="" class="set-4-input">'+
    '</div>'+
    '</div>'+
    '<div class="n-sale-set-box">'+
    '<h4 class="f-07 col-3 m-t">真实姓名:</h4>'+
    '<div class="n-sale-input">'+
    '<input type="text" name="data[real_name]" id="real_name" placeholder="姓名(必填)" value="" class="set-4-input">'+
    '</div>'+
    '</div>'+
    '<div class="n-sale-set-box">'+
    '<h4 class="f-07 col-3 m-t">手机号:</h4>'+
    '<div class="n-sale-input">'+
    '<input type="text" name="data[shop_mobile]" id="shop_mobile" placeholder="手机号码(必填)" value="" class="set-4-input">'+
    '</div>'+
    '</div>'+
    '<div class="n-sale-set-box">'+
    '<h4 class="f-07 col-3 m-t">QQ号:</h4>'+
    '<div class="n-sale-input">'+
    '<input type="text" name="data[shop_qq]" id="shop_qq" placeholder="QQ号(选填)" value="" class="set-4-input">'+
    '</div>'+
    '</div>'+
    '<div class="n-t-a-center">'+
    '<button type="submit" class="n-set-4-submit">下一步</button>'+
    '</div>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.n-set-4-submit').click(function () {
        let shop={}
        let shopName=$('#shop_name').val();
        let realName=$('#real_name').val();
        let shopMobile=$('#shop_mobile').val();
        let shopQq=$('#shop_qq').val();
        shop.shopName=shopName;
        shop.realName=realName;
        shop.shopMobile=shopMobile;
        shop.shopQq=shopQq;
        shop.prev=URL.param("prevId");
        if(shopName==''){
            dialog.alert({
                title:"提示",
                msg:'店铺名称 不能为空',
                buttons:['确定']
            })
        }else if(realName==''){
            dialog.alert({
                title:"提示",
                msg:'真实姓名 不能为空',
                buttons:['确定']
            })
        }else if(shopMobile==''){
            dialog.alert({
                title:"提示",
                msg:'手机号 不能为空',
                buttons:['确定']
            })
        }else{
            $.get("/new-store",shop,function (val) {
                if(val.affectedRows>0){
                    loadLib('/sale_2',{"type":"insert"})
                }
            })
        }
    })
}
