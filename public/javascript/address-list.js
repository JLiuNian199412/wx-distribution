let template=
    '<section class="flow-consignee-list j-get-consignee-one select-three" id="J_ItemList">'+
    '<li class="flow-checkout-adr m-top08 single_item ">'+
    '<div class="flow-set-adr of-hidden padding-all ">'+
    '<div class="ect-select fl">'+
    '<label class="dis-box  active" >'+
    '<i class="select-btn"></i>'+
    '<span class="box-flex">设为默认</span>'+
    '</label>'+
    '</div>'+
    '<div class="fr">'+
    '<span><i class="aui-iconfont aui-icon-edit"></i>编辑</span>'+
    '<span><i class="aui-iconfont aui-icon-trash"></i>删除</span>'+
    '</div>'+
    '</div>'+
    '<div class="flow-have-adr padding-all">'+
    '<p class="f-h-adr-title">'+
    '<label>1</label><span class="ect-colory">15215211512</span></p>'+
    '<p class="f-h-adr-con t-remark m-top04">福建龙岩长汀县 14</p>'+
    '</div>'+
    '</li>'+
    '<li class="flow-checkout-adr m-top08 single_item ">'+
    '<div class="flow-set-adr of-hidden padding-all ">'+
    '<div class="ect-select fl">'+
    '<label class="dis-box  " >'+
    '<i class="select-btn"></i>'+
    '<span class="box-flex">设为默认</span>'+
    '</label>'+
    '</div>'+
    '<div class="fr">'+
    '<span><i class="aui-iconfont aui-icon-edit"></i>编辑</span>'+
    '<span><i class="aui-iconfont aui-icon-trash"></i>删除</span>'+
    '</div>'+
    '</div>'+
    '<div class="flow-have-adr padding-all">'+
    '<p class="f-h-adr-title">'+
    '<label>s</label><span class="ect-colory">18025522115</span></p>'+
    '<p class="f-h-adr-con t-remark m-top04">甘肃甘南玛曲县 sf</p>'+
    '</div>'+
    '</li>'+
    '</section>'+
    '<div class="filter-btn dis-box">'+
    '<span class="btn-submit box-flex">新增收货地址</span>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.btn-submit').click(function () {
        loadLib('/address-detail')
    })
}
