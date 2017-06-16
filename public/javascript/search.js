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
    '{{#each List}}'+
    '<li><span>{{content}}</span></li>'+
    '{{/each}}'+
    '</ul>'+
    '</div>'+
    '</section>'+
    '<span class="close-search">点击关闭</span>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('#newinput').bind('input',function(){
        if($(this).val()!=''){
            $('.isNull').addClass('active')
        }else{
            $('.isNull').removeClass('active')
        }
    });
    $('.close-search').click(function(){
        loadLib(sessionStorage.getItem('searchBackUrl'));
    });
    $('section.search .text-all .aui-icon-left').click(function(){
            backUrl()
    });
    $('.isNull').click(function () {
        $('#newinput').val('');
        $(this).removeClass('active');
    });
    function submitSearch() {
        let searchText=$('#newinput').val();
        searchText=searchText.trim();
        if(searchText){
            $.get('/insert-search',{"text":searchText},function (res) {
                if(res!='err'){
                    sessionStorage.setItem('searchContent',searchText);
                    sessionStorage.setItem('indexProduct',false);
                    sessionStorage.removeItem('shopSort');
                    sessionStorage.removeItem('sortDirection');
                    loadLib('/shop-production')
                }else{
                    toast.fail({
                        title:"搜索失败",
                        duration:1000
                    });
                }
            })
        }
    }
    $('.btn-submit').click(function () {
        submitSearch();
    });
    $('#newinput').keydown(function(e){
        if(e.keyCode==13){
            submitSearch();
        }
    });
    $('.aui-iconfont.aui-icon-trash').click(function () {
        $.get('/delete-search',function (res) {
            if(res!='err'&&res.affectedRows!='0'){
                toast.success({
                    title:"删除成功",
                    duration:1000
                });
                $('#search_histroy li').remove();
            }else{
                toast.fail({
                    title:"删除失败",
                    duration:1000
                });
            }
        })
    })
}
