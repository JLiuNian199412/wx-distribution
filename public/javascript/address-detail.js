let template=
    '<section class="flow-consignee ect-bg-colorf s-user-top onclik-admin">'+
    '<ul class="address-detail" data-title="{{title}}" data-id="{{addressId}}">'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">收货人姓名：</h3>'+
    '<div class="box-flex t-goods1 n-pro-name  onelist-hidden"><input name="consignee" maxlength="10" placeholder="收货人姓名必填" type="text" class="inputBg address-name" value="{{name}}"></div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">手机：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name"><input maxlength="11" placeholder="手机必填" name="mobile" type="text" class="inputBg_touch address-phone" value="{{phone}}"></div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">省/直辖市：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name">'+
    '<input  type="text" class="n-edit-box box-flex address-province" name="province" value="{{province}}" >'+
    '</div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">城市：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name">'+
    '<input  type="text" class="n-edit-box box-flex address-city" name="city" value="{{city}}">'+
    '</div>'+
    '</li>'+
    '<li class="dis-box" id="selDistricts__box" style="">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">区/县：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name">'+
    '<input  type="text" class="n-edit-box box-flex address-district" name="district" value="{{district}}"/>'+
    '</div>'+
    '</li>'+
    '<li class="input-text "><b class="pull-left">详细地址：</b>'+
    '<textarea name="address" placeholder="详细地址必填"  class="address-detailInfo" value="{{detail}}">{{detail}}</textarea>'+
    '</li>'+
    '</ul>'+
    '<div class="two-btn ect-padding-tb   text-center">'+
    '<input type="submit" name="submit" class="btn-submit" value="新增收货地址">'+
    '</div>'+
    '</section>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.aui-bar .aui-title').text($(".address-detail").data("title"));
    if($(".address-detail").data("title")=='编辑地址'){
        $('.btn-submit').val('修改地址')
    }
    $('.btn-submit').click(function () {
        let adName=$('.address-name');
        let adPhone=$('.address-phone');
        let adProvince=$('.address-province');
        let adCity=$('.address-city');
        let adDistrict=$('.address-district');
        let adDetail=$('.address-detailInfo');
        let auiTitle=$(".address-detail").data("title")
        let address={};
        if(auiTitle=='编辑地址'){
            address.type='edit'
        }else if(auiTitle='新增地址'){
            address.type='add'
        }
        address.name=adName.val();
        address.phone=adPhone.val();
        address.province=adProvince.val();
        address.city=adCity.val();
        address.district=adDistrict.val();
        address.detail=adDetail.val();
        address.addressId=($(".address-detail").data("id"));

        console.log(address)
       if(address.name==''){
           dialog.alert({
               title:"提示",
               msg:'收货人 不能为空',
               buttons:['确定']
           })
       }else if(address.phone==''){
           dialog.alert({
               title:"提示",
               msg:'电话 不能为空',
               buttons:['确定']
           })
       }else if(address.province==''){
           dialog.alert({
               title:"提示",
               msg:'省/直辖市 不能为空',
               buttons:['确定']
           })
       }else if(address.city==''){
           dialog.alert({
               title:"提示",
               msg:'城市 不能为空',
               buttons:['确定']
           })
       }else if(address.district==''){
           dialog.alert({
               title:"提示",
               msg:'区/县 不能为空',
               buttons:['确定']
           })
       }else if(address.detail==''){
           dialog.alert({
               title:"提示",
               msg:'详细地址 不能为空',
               buttons:['确定']
           })
       }else{
           $.get("/update-address",address,function (val) {
               if(address.type=='add'){
                   if(val.affectedRows>0){
                       toast.success({
                           title:"新增成功",
                           duration:1000
                       });
                   }
               }else{
                   if(val.affectedRows>0){
                       toast.success({
                           title:"修改成功",
                           duration:1000
                       });
                   }
               }
               backUrl()
           })
       }

    })
}
