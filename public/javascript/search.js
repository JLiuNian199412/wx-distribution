let template=
    '<div class="search-div">'+
    '<section class="search">'+
    '<div class="text-all">'+
    '<a class="aui-pull-left aui-btn"><span class="aui-iconfont aui-icon-left"></span></a>'+
    '<div class="box-flex input-text">'+
    '<input type="text" name="name" placeholder="请输入搜索关键词！" id="newinput" autofocus="autofocus">'+
    '<span class="isNull"><i class="aui-iconfont aui-icon-close is-null "></i></span>'+
    '</div>'+
    '<button type="button" class="btn-submit">搜索</button>'+
    '</div>'+
    '</section>'+
    '<section class="search-con">'+
    '<div>'+
    '<p class="hos-search">'+
    '<label class="fl">最近搜索</label>'+
    '<span class="fr"><i class="aui-iconfont aui-icon-trash"></i></span>'+
    '</p>'+
    '<ul class="hot-search" id="search_histroy">'+
    '<li><span>看不懂</span></li>'+
    '<li><span>人</span></li>'+
    '<li><span>ren </span></li>'+
    '<li><span>是</span></li>'+
    '<li><span>nan </span></li>'+
    '<li><span>nan</span></li>'+
    '</ul>'+
    '</div>'+
    '</section>'+
    '<span class="close-search">点击关闭</span>'+
    '</div>';
localStorage.setItem('template',template);
function searchJsLoad(){
    $('#newinput').bind('input',function(){
        if($(this).val()!=''){
            $('.isNull').addClass('active')
        }else{
            $('.isNull').removeClass('active')
        }
    })
    $('.close-search').click(function(){
        loadLib(sessionStorage.getItem('backUrl'))
    })
}
