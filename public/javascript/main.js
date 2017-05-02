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
            $('.oldCss').remove();
            $('.oldJs').remove();
            $.each(result.jsList,function(_,v){
                str+="<script type='text/javascript' src='/javascript/"+v+"' class='jsList'><\/script>"
            });
            $('footer').after(str);
            showTemplate(option)
        });
    }
}
function hideFooter(){
    $('footer').hide()
}
function showFooter(){
    $('footer').show()
}
function loadLib(url){
    let option={};
    if(url=='/home'){
        option.left=ui.menu;
        option.title=ui.search;
        option.right=ui.comment;
        showFooter();
    }else if(url=='/shop'){
        option.all=ui.search;
        showFooter();
    }else if(url=='/shop-cart'){
        option.left=ui.left;
        option.title='购物车';
        showFooter();
    }else if(url=='/search'){
        option.all='';
        hideFooter();
    }else if(url=='/shop-production'){
        option.left=ui.left;
        option.title=ui.search;
        option.right=ui.home;
        hideFooter();
    }
    $.get(url,function(result){
        option.result=result.val;
        option.type=result.type;
        $('.cssList').addClass('oldCss');
        $('.jsList').addClass('oldJs');
        $.each(result.cssList,function(_,v){
            loadCss('/stylesheet/'+v,_,result,option);
        });
    })
}
function showTemplate(option){
    let template = Handlebars.compile(localStorage.getItem('template'));
    $('#content').html(template(option.result));
    if(option.all){
        $('header').html(option.all)
    }else{
        $('header').html('<a class="aui-pull-left aui-btn"> </a> <div class="aui-title"> </div> <a class="aui-pull-right aui-btn "> </a>');
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

