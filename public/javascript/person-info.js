let template=
    '<section class="flow-consignee ect-bg-colorf s-user-top onclik-admin">'+
    '<ul>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">用户名：</h3>'+
    '<div class="box-flex t-goods1  onelist-hidden"> <input name="email" type="text" readonly="readonly" placeholder="liunian" value="{{name}}"></div>'+
    '</li>'+
    '<li class="dis-box">'+
    '<h3 class="profile-left-name text-all-span my-u-title-size">电子邮件：</h3>'+
    '<div class="box-flex t-goods1 onelist-hidden "> <input name="email" type="text" class="person-email" placeholder="请输入电子邮箱" value="{{email}}"></div>'+
    '</li>'+
    '</ul>'+
    '</section>'+
    '<section class="b-color-f my-nav-box m-top10">'+
    '<div class="s-user-top">'+
    '<div class="dis-box person-address">'+
    '<h3 class="box-flex text-all-span my-u-title-size">收货地址</h3>'+
    '<span class="t-jiantou"><i class="aui-iconfont aui-icon-right jian-top"></i></span>'+
    '</div>'+
    '</div>'+
    '</section>'+
    '<div class=" ect-padding-tb padding-all">'+
    '<button name="submit" type="button" class="btn-submit" value="确认修改">确认修改</button>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    // dialog.alert({
    //     title:"提示",
    //     msg:"未输入正确的邮箱格式",
    //     buttons:['确定']
    // });
    $('.btn-submit').click(function () {
        let email=$('.person-email').val();
        $.get('/update-person',{"email": email},function (val) {
            if(val.affectedRows>0){
                toast.success({
                    title:"信息更新成功",
                    duration:1000
                });
                loadLib('/mine')
            }else{
                toast.fail({
                    title:"信息更新失败",
                    duration:1000
                });
            }
        });

    });
    $('.person-address').click(function () {
        loadLib('/address-list')
    })
}
