let template=
    '<section class="product-sequence">'+
    '<span class="box-flex a-change">默认</span>'+
    '<span class="box-flex">销量<i class="aui-iconfont aui-icon-down"></i></span>'+
    '<span class="box-flex">人气<i class="aui-iconfont aui-icon-down"></i></span>'+
    '<span class="box-flex active">价格<i class="aui-iconfont aui-icon-down"></i></span>'+
    '</section>' +
    '<section class="aui-grid product-list">'+
    '<div class="aui-row">'+
    '{{#each List}}'+
    '<div class="aui-col-xs-6 product-div" data-id="{{id}}">'+
    '<div class="product-content">'+
    '<div class="product-img">'+
    '<img src="/images/{{picUrl}}" alt="">'+
    '</div>'+
    '<h4>{{name}}</h4>'+
    '<p><span>￥{{price}}元</span></p>'+
    '</div>'+
    '</div>' +
    '{{/each}}'+
    '</div>'+
    '</section>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.aui-pull-right.aui-btn').click(function(){
        $('footer .aui-bar-tab-item .aui-icon-home').click();
    });
    $('#search-input').click(function(){
        sessionStorage.setItem('searchBackUrl','/shop-production');
        loadLib('/search');
    });
    $('.product-sequence .box-flex').click(function(){
        let _self=$(this);
        let iconFont=$('.product-sequence .active .aui-iconfont');
        if(!_self.hasClass('a-change')&&!_self.hasClass('active')){
            _self.parent().children().removeClass('active');
            _self.addClass('active')
        }else if(_self.hasClass('active')){
            if(iconFont.hasClass('aui-icon-down')){
                iconFont.removeClass('aui-icon-down').addClass('aui-icon-top')
                loadLib()
            }else{
                iconFont.removeClass('aui-icon-top').addClass('aui-icon-down')
            }
        }else if(_self.hasClass('a-change')){
            _self.parent().children().removeClass('active');
            $('.product-sequence .aui-iconfont').removeClass('aui-icon-top').addClass('aui-icon-down')
        }
    });
    $('.product-div').click(function(){
        loadLib('/production-detail',{'goodsId':$(this).data("id")});
    })

}