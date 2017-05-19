function styleOnload(node, callback) {
    // for IE6-9 and Opera
    if (node.attachEvent) {
        node.attachEvent('onload', callback);
    }
    // polling for Firefox, Chrome, Safari
    else {
        setTimeout(function() {
            poll(node, callback);
        }, 0); // for cache
    }
}
function poll(node, callback) {
    if (callback.isCalled) {
        return;
    }
    var isLoaded = false;
    if (/webkit/i.test(navigator.userAgent)) {//webkit
        if (node['sheet']) {
            isLoaded = true;
        }
    }
    // for Firefox
    else if (node['sheet']) {
        try {
            if (node['sheet'].cssRules) {
                isLoaded = true;
            }
        } catch (ex) {
            // NS_ERROR_DOM_SECURITY_ERR
            if (ex.code === 1000) {
                isLoaded = true;
            }
        }
    }
    if (isLoaded) {
        // give time to render.
        setTimeout(function() {
            callback();
        }, 1);
    }
    else {
        setTimeout(function() {
            poll(node, callback);
        }, 1);
    }
}
// 我的动态创建LINK函数
function createLink(cssURL,lnkId,charset,media){
    var head = document.getElementsByTagName('head')[0],
        linkTag = null;

    if(!cssURL){
        return false;
    }
    linkTag = document.createElement('link');
    linkTag.setAttribute('id',(lnkId || 'dynamic-style'));
    linkTag.setAttribute('rel','stylesheet');
    linkTag.setAttribute('charset',(charset || 'utf-8'));
    linkTag.setAttribute('media',(media||'all'));
    linkTag.setAttribute('type','text/css');
    linkTag.setAttribute('class','cssList');
    linkTag.href = cssURL;
    head.appendChild(linkTag);
    return linkTag;
}
function loadCss(url,index,result,option){
    var styleNode = createLink(url);
    if(index==result.cssList.length-1){
        styleOnload(styleNode,function(){
            let str='';
            let oldCSS=$('.oldCss');
            if(sessionStorage.getItem('isBack')!='true'||!sessionStorage.getItem('backUrl')){
                let backUrl=sessionStorage.getItem('backUrl');
                if(backUrl==''||backUrl==null){
                    sessionStorage.setItem('backUrl','/'+oldCSS.attr('href').split('/')[2].split('.')[0]);
                }else{
                    sessionStorage.setItem('backUrl',backUrl+','+'/'+oldCSS.attr('href').split('/')[2].split('.')[0]);
                }
            }else if(sessionStorage.getItem('isBack')=='true'){
                sessionStorage.setItem('isBack','false')
            }
            oldCSS.remove();
            $('.oldJs').remove();
            $.each(result.jsList,function(_,v){
                str+="<script type='text/javascript' src='/javascript/"+v+"' class='jsList'><\/script>"
            });
            $('footer').after(str);
            showTemplate(option)
        });
    }
}
function loadLib(url){
    let option={};
    if(url=='/home'){
        option.left=ui.menu;
        option.title=ui.search;
        option.right=ui.comment;

    }else if(url=='/shop'){
        option.all=ui.search;
    }else if(url=='/shop-cart'){
        option.left=ui.left;
        option.title='购物车';
    }else if(url=='/search'){
        option.all='';
    }else if(url=='/shop-production'){
        option.left=ui.left;
        option.title=ui.search;
        option.right=ui.home;
    }
    $.get(url,function(result){
        option.result=result.val;
        option.type=result.type;
        $('.cssList').addClass('oldCss');
        $('.jsList').addClass('oldJs');
        $.each(result.cssList,function(_,v){
            loadCss('/stylesheet/'+v,_,result,option);
        });
    });
}
function backUrl(){
    let urlList=sessionStorage.getItem('backUrl').split(',')
    let url=urlList.pop();
    if(url=='/home'){
        sessionStorage.setItem('backUrl','');
    }else{
        sessionStorage.setItem('backUrl',urlList);
    }
    sessionStorage.setItem('isBack',"true");
    let footBar=$('footer .aui-bar-tab-item');
    let currentBar=$('footer .aui-bar-tab-item.aui-active').text();
    if(url=='/home'){
        if(footBar.eq(0).text()==currentBar){
            loadLib(url)
        }else{
            footBar.eq(0).click();
        }
    }else if(url=='/shop'){
        if(footBar.eq(1).text()==currentBar){
            loadLib(url)
        }else{
            footBar.eq(1).click();
        }
    }else if(url=='/store'){
        if(footBar.eq(2).text()==currentBar){
            loadLib(url)
        }else{
            footBar.eq(2).click();
        }
    }else if(url=='/shop-cart'){
        if(footBar.eq(3).text()==currentBar){
            loadLib(url)
        }else{
            footBar.eq(3).click();
        }
    }else if(url=='/mine'){
        if(footBar.eq(4).text()==currentBar){
            loadLib(url)
        }else{
            footBar.eq(4).click();
        }
    }else{
        loadLib(url)
    }
}
function showTemplate(option){
    let template = Handlebars.compile(localStorage.getItem('template'));
    $('#content').html(template(option.result));
    if(option.all){
        $('header.aui-bar-nav').html(option.all)
    }else{
        $('header.aui-bar-nav').html('<a class="aui-pull-left aui-btn"> </a> <div class="aui-title"> </div> <a class="aui-pull-right aui-btn "> </a>');
        if(option.title){
            $('.aui-title').html(option.title);
        }
        if(option.left){
            $('.aui-pull-left').html(option.left);
        }
        if(option.right){
            $('.aui-pull-right').html(option.right)
        }
    }
    $('.aui-bar-nav .aui-icon-left').click(function(){
        backUrl();
    });
    CurrentJsLoad()
}
var ui={};
ui.header='<a class="aui-pull-left aui-btn"></a><div class="aui-title"></div><a class="aui-pull-right aui-btn "></a>';
ui.search='<div class="aui-searchbar" id="search">'+
            '<div class="aui-searchbar-input aui-border-radius" tapmode>'+
                 '<i class="aui-iconfont aui-icon-search"></i>'+
                 '<form action="javascript:search();">'+
                     '<input type="search" placeholder="请输入搜索内容" id="search-input">'+
                 '</form>'+
            '</div>'+
        '</div>';
ui.menu= '<span class="aui-iconfont aui-icon-menu"></span>';
ui.comment= '<span class="aui-iconfont aui-icon-comment"></span>';
ui.left= '<span class="aui-iconfont aui-icon-left"></span>';
ui.home= '<span class="aui-iconfont aui-icon-home"></span>';
var URL={};
URL.host=window.location.host;
URL.param=function (param) {
    let a=window.location.search.substring(1);
    let b=[];
    if(a.split('&').length>0){
        for(let i=0;i<a.split('&').length;i++){
            b[a.split('&')[i].split('=')[0]]=a.split('&')[i].split('=')[1];
        }
        if(param){
            return b[param]
        }else{
            return b
        }
    }
};