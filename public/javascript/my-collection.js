let template=
    '<section class="product-list-small">'+
    '<ul>'+
    '{{#each List}}'+
    '<li class="collection-{{id}}">'+
    '<div class="product-div">'+
    '<img class="product-list-img" src="/images/{{url}}">'+
    '<div class="product-text">'+
    '<h4>{{name}}</h4>'+
    '<div class="n-money-con">'+
    '<span class="p-price">￥{{price}}元</span>'+
    '<small class="ect-margin-lr">'+
    '<del>￥{{marketPrice}}元</del>'+
    '</small>'+
    '</div>'+
    '<div class="dis-box n-but-box">'+
    '<section class="j-goods-attr">'+
    '<div class="s-but" data-goodid="{{id}}">加入购物车</div>'+
    '</section>'+
    '<div class="n-del"><i class="aui-iconfont aui-icon-trash f-r" data-id="{{id}}" data-out="collection-{{id}}"></i></div>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</li>'+
    '{{/each }}'+
    '</ul>'+
    '</section>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
   $('.s-but').click(function () {
       let $this=$(this);
       $.get('/insert-shopcart',{"goodId":$this.data("goodid"),"qty":1},function (val) {
           if(val!=''&&val!='err'){
               toast.success({
                   title:"加入购物车成功",
                   duration:1000
               });
               $.get('/count-shopcart',function (res) {
                   if(res){
                       $('footer.aui-bar.aui-bar-tab .aui-badge').text(res[0].total)
                   }
               })
           }else if(val=='err'){
               toast.fail({
                   title:"加入购物车失败",
                   duration:1000
               });
           }
       })
   })
    $('.n-del i').click(function () {
        let $this=$(this);
        let goodId=$this.data("id");
        $.get('/edit-collection',{"type":"cancel","goodId":goodId},function (val) {
            if(val.affectedRows!=0){
                toast.success({
                    title:"取消收藏",
                    duration:1000
                });
            }
            $("."+$this.data('out')).remove();
        })
    })
}