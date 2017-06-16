let template=
    '<section class="product-sequence">'+
    '<span class="box-flex a-change">默认</span>'+
    '<span class="box-flex">销量<i class="aui-iconfont aui-icon-down"></i></span>'+
    '<span class="box-flex">人气<i class="aui-iconfont aui-icon-down"></i></span>'+
    '<span class="box-flex">价格<i class="aui-iconfont aui-icon-down"></i></span>'+
    '</section>' +
    '<section class="aui-grid product-list">'+
    '</section>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    let str='<div class="aui-row">' +
        '{{#each List}}' +
        '<div class="aui-col-xs-6 product-div" data-id="{{id}}">' +
        '<div class="product-content">' +
        '<div class="product-img">' +
        '<img src="/images/{{url}}" alt="">' +
        '</div>' +
        '<h4>{{name}}</h4>' +
        '<p><span>￥{{price}}元</span></p>' +
        '</div>' +
        '</div>' +
        '{{/each}}' +
        '</div>';
    function productView() {
        let option={};
        if(sessionStorage.getItem('indexProduct')!='true'&&!sessionStorage.getItem('searchContent')){
            option.prdType=sessionStorage.getItem("shopType");
            option.detailType=sessionStorage.getItem("shopDetailType");
            option.sex=sessionStorage.getItem("shopSex");
        }
        if(sessionStorage.getItem('searchContent')&&sessionStorage.getItem('searchContent')!=''){
            option.searchContent=sessionStorage.getItem('searchContent');
        }
        $.get('/shop-production', option,function(result){
            let template2 = Handlebars.compile(str);
            $('.product-list').html(template2(result.val));
        })
    }
    function sortView(option) {
        $.get('/product-sort',option,function(result){
            let template2 = Handlebars.compile(str);
            $('.product-list').html(template2(result.val));
        });
    }
    $('.aui-pull-right.aui-btn').click(function(){
        $('footer .aui-bar-tab-item .aui-icon-home').click();
    });
    $('#search-input').click(function(){
        sessionStorage.setItem('searchBackUrl','/shop-production');
        loadLib('/search');
    });
    $('.product-sequence .box-flex').click(function(){
        let _self=$(this);
        let shopType=sessionStorage.getItem('shopType');
        let shopDetailType=sessionStorage.getItem('shopDetailType');
        let shopSex=sessionStorage.getItem('shopSex');
        let iconFont=$('.product-sequence .active .aui-iconfont');
        let shopSort='';
        let sortDirection='';
        let option={};
        if(!_self.hasClass('a-change')&&!_self.hasClass('active')){
            _self.parent().children().removeClass('active');
            _self.addClass('active');
            $('.product-sequence .aui-iconfont').removeClass('aui-icon-top').addClass('aui-icon-down')
            if(_self.text()=='销量'){
                sessionStorage.setItem('shopSort','sales');
            }else if(_self.text()=='人气'){
                sessionStorage.setItem('shopSort','popularity');
            }if(_self.text()=='价格'){
                sessionStorage.setItem('shopSort','price');
            }
            shopSort= sessionStorage.getItem('shopSort');
            sortDirection='DESC';
        }else if(_self.hasClass('active')){
            if(iconFont.hasClass('aui-icon-down')){
                iconFont.removeClass('aui-icon-down').addClass('aui-icon-top');
                sortDirection='ASC';
            }else{
                iconFont.removeClass('aui-icon-top').addClass('aui-icon-down');
                sortDirection='DESC';
            }
            shopSort= sessionStorage.getItem('shopSort');
        }else if(_self.hasClass('a-change')){
            _self.parent().children().removeClass('active');
            $('.product-sequence .aui-iconfont').removeClass('aui-icon-top').addClass('aui-icon-down');
            sortDirection='ASC';
            shopSort='id';
        }
        if(sessionStorage.getItem('indexProduct')!='true'&&!sessionStorage.getItem('searchContent')){
            option.prdType=shopType;
            option.detailType=shopDetailType;
            option.sex=shopSex;
        }
        if(sessionStorage.getItem('searchContent')&& sessionStorage.getItem('searchContent')!=''){
            option.searchContent=sessionStorage.getItem('searchContent');
        }
        option.sortDirection=sortDirection;
        option.sortBy=shopSort;
        sessionStorage.setItem('sortDirection',sortDirection);
        if(sessionStorage.getItem('shopIndex')){
            option.index=sessionStorage.getItem('shopIndex');
            option.accout=6;
        }
        sortView(option)
    });
    $('.product-list').delegate('.product-div',"click",function () {
        loadLib('/production-detail',{'goodsId':$(this).data("id")});
    })
    if(sessionStorage.getItem("shopSort")&&sessionStorage.getItem("shopSort")!=''){
        let option={};
        if(sessionStorage.getItem('indexProduct')!='true'){
            option.prdType=sessionStorage.getItem("shopType");
            option.detailType=sessionStorage.getItem("shopDetailType");
            option.sex=sessionStorage.getItem("shopSex");
        }
        option.sortDirection=sessionStorage.getItem("sortDirection");
        option.sortBy=sessionStorage.getItem("shopSort");
        sortView(option)
    }else {
        productView()
    }
    let scroll = new auiScroll({
        listen:false, //是否监听滚动高度，开启后将实时返回滚动高度
        distance:0 //判断到达底部的距离，isToBottom为true
    },function(ret){
        if(ret.isToBottom){
            console.log(ret)
        }
    });
}