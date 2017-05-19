let template=
    '<div id="box" class="n-sale-shop-box bg-color-whie">'+
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
    '<div class="header-x p-a o-hs-x active"></div>'+
    '<div class="header-y p-a o-hs-bg active"><span class="text-c color-whie f-03">2</span></div>'+
    '</div>'+
    '<label class="o-hs active">设置分类信息</label>'+
    '</div>'+
    '<div class="box-flex">'+
    '<div class="header-left-box p-r">'+
    '<div class="header-x p-a o-hs-x"></div>'+
    '<div class="header-y p-a o-hs-bg"><span class="text-c color-whie f-03">3</span></div>'+
    '</div>'+
    '<label class="o-hs">完成</label>'+
    '</div>'+
    '</div>'+
    '<section class="padding-all m-t">'+
    '<div class="padding-all huang-bg n-ti-bg b-r">'+
    '<h4 class="n-set3_list2">温馨提示</h4>'+
    '<p class="f-03 n-set_list">亲，您的佣金由三部分组成： 1.本店所销售的商品，我所获得佣金（即本店销售佣金） 2.下级分店所销售的商品，我所获得的佣金(一级分店佣金) 3.下级分店发展的分店所销售的商品，我所获得的佣金（即二级分店佣金）</p>'+
    '</div>'+
    '<div class="n-sale-tit m-b1 m-t05">'+
    '<span class="f-07 col-4">选择商品</span>'+
    '</div>'+
    '<div class="ect-radio m-b1 m-t05">'+
    '<input type="checkbox" id="checkAll" >'+
    '<label for="checkAll"><span class="f-06 col-7 m-l-05">全选</span><i></i></label>'+
    '</div>'+
    '<div class="sp_box">'+
    '<div class="sp_box_div">'+
    '<div class="b-r sp_box_all sp_box1" id="cate_47">'+
    '<input type="checkbox" name="cate[]" value="47" class="elecheck display-none">'+
    '<h4 class="sp_title text-c  f-06">鞋/箱包</h4>'+
    '<span>一级分店佣金：60.00%</span>'+
    '<span>二级分店佣金：20.00%</span>'+
    '<span>三级分店佣金：20.00%</span>'+
    '</div>'+
    '</div>'+
    '<div class="sp_box_div">'+
    '<div class="b-r sp_box_all sp_box1" id="cate_785">'+
    '<input type="checkbox" name="cate[]" value="78" class="elecheck display-none">'+
    '<h4 class="sp_title text-c  f-06">珠宝首饰/手表眼镜</h4>'+
    '<span>一级分店佣金：50.00%</span>'+
    '<span>二级分店佣金：40.00%</span>'+
    '<span>三级分店佣金：10.00%</span>'+
    '</div>'+
    '</div>'+
    '<div class="sp_box_div">'+
    '<div class="b-r sp_box1 sp_box_all" id="cate_111">'+
    '<input type="checkbox" name="cate[]" value="111"  class="elecheck display-none">'+
    '<h4 class="sp_title text-c  f-06">美妆护肤</h4>'+
    '<span>一级分店佣金：50.00%</span>'+
    '<span>二级分店佣金：30.00%</span>'+
    '<span>三级分店佣金：20.00%</span>'+
    '</div>'+
    '</div>'+
    '<div class="sp_box_div">'+
    '<div class="b-r sp_box1 sp_box_all" id="cate_169">'+
    '<input type="checkbox" name="cate[]" value="169" class="elecheck display-none">'+
    '<h4 class="sp_title text-c  f-06">家用电器</h4>'+
    '<span>一级分店佣金：50.00%</span>'+
    '<span>二级分店佣金：30.00%</span>'+
    '<span>三级分店佣金：20.00%</span>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '<div class="t-a-center n-fixed-box padding-alla">'+
    '<button type="submit" class="n-set-4-submit">下一步</button>'+
    '</div>'+
    '</section>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.sp_box_all').click(function () {
        let $this=$(this);
        let $checkAll=$('#checkAll');
        if($this.hasClass('sp_box1')){
            $this.addClass('sp_box2').removeClass('sp_box1');
            $this.find('input[type=checkbox]').prop("checked", true);
        }else {
            $this.addClass('sp_box1').removeClass('sp_box2');
            $this.find('input[type=checkbox]').prop("checked", false);
        }
        if($('.elecheck:checked').length!=$('.elecheck').length){
            $checkAll.prop("checked",false)
        }else{
            $checkAll.prop("checked",true)
        }

    });
    $('#checkAll').click(function () {
        let isCheck=$(this).is(':checked');
        if(isCheck==true){
            $('.sp_box_all').addClass('sp_box2').removeClass('sp_box1');
            $('.elecheck').prop("checked", true);
        }else{
            $('.sp_box_all').addClass('sp_box1').removeClass('sp_box2');
            $('.elecheck').prop("checked", false);
        }
    })
    $('.n-set-4-submit').click(function () {
        $.each($('.elecheck:checked'),function (_,v) {
            console.log($(v).next().text())
        })
        loadLib('/sale_3')
    })
}