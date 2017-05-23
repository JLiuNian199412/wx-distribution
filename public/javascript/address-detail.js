let template=
    '<section class="flow-consignee ect-bg-colorf s-user-top onclik-admin">'+
    '<ul>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">收货人姓名：</h3>'+
    '<div class="box-flex t-goods1 n-pro-name  onelist-hidden"><input name="consignee" maxlength="10" placeholder="收货人姓名必填" type="text" class="inputBg" value=""></div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">手机：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name"><input maxlength="11" placeholder="手机必填" name="mobile" type="text" class="inputBg_touch" value=""></div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">省/直辖市：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name">'+
    '<input  type="text" class="n-edit-box box-flex" name="province" id="selProvinces_">'+
    '</div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">城市：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name">'+
    '<input  type="text" class="n-edit-box box-flex" name="city" id="selCities_">'+
    '</div>'+
    '</li>'+
    '<li class="dis-box" id="selDistricts__box" style="">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">区/县：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden n-pro-name">'+
    '<input  type="text" class="n-edit-box box-flex" name="district" id="selDistricts_"/>'+
    '</div>'+
    '</li>'+
    '<li class="input-text "><b class="pull-left">详细地址：</b>'+
    '<textarea name="address" placeholder="详细地址必填" ></textarea>'+
    '</li>'+
    '</ul>'+
    '<div class="two-btn ect-padding-tb   text-center">'+
    '<input type="submit" name="submit" class="btn-submit" value="新增收货地址">'+
    '</div>'+
    '</section>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.btn-submit').click(function () {
        loadLib('/address-list')
    })
}
