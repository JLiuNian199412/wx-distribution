let template=
    '<section class="flow-consignee-list j-get-consignee-one select-three" id="J_ItemList">'+
    '{{#each List}}'+
    '<li class="flow-checkout-adr m-top08 single_item ">'+
    '<div class="flow-set-adr of-hidden padding-all ">'+
    '<div class="ect-select fl">'+
    '{{#compare selects 0}}'+
    '<label data-id="{{addressId}}" class="dis-box active " >'+
    '{{else}}'+
    '<label data-id="{{addressId}}" class="dis-box " >'+
    '{{/compare}}'+
    '<i class="select-btn"></i>'+
    '<span class="box-flex">设为默认</span>'+
    '</label>'+
    '</div>'+
    '<div class="fr">'+
    '<span class="edit-address" data-id="{{addressId}}"><i class="aui-iconfont aui-icon-edit" ></i>编辑</span>'+
    '<span class="delete-address" data-id="{{addressId}}"><i class="aui-iconfont aui-icon-trash"></i>删除</span>'+
    '</div>'+
    '</div>'+
    '<div class="flow-have-adr padding-all">'+
    '<p class="f-h-adr-title">'+
    '<label>{{name}}</label><span class="ect-colory">{{phone}}</span></p>'+
    '<p class="f-h-adr-con t-remark m-top04">{{province}}{{city}}{{district}}  {{detail}}</p>'+
    '</div>'+
    '</li>'+
    '{{/each }}'+
    '</section>'+
    '<div class="filter-btn dis-box">'+
    '<span class="btn-submit box-flex">新增收货地址</span>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.edit-address').click(function () {
        let $this=$(this);
        loadLib('/address-detail',{"type":"edit","addressId":$this.data("id")})
    });
    $('.delete-address').click(function () {
        let $this=$(this);
        $.get('/delete-address',{"addressId":$this.data("id")},function (val) {
            if(val.affectedRows>0){
                $this.parent().parent().parent().remove();
                toast.success({
                    title:"已删除",
                    duration:1000
                });
            }
        })
    })
    $('.btn-submit').click(function () {
        loadLib('/address-detail',{"type":"add"})
    })
    $('.ect-select label').click(function () {
        let $this=$(this);
        $('.ect-select label').removeClass('active');
        $this.addClass('active');
        $.get("/set-defaultAddress",{"addressId":$this.data("id")},function (val) {
            if(val.affectedRows>0){

            }
        })
    })
}
