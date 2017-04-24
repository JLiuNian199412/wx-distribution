function loadLib(url){
    let str='';
    $.get(url,function(result){
        $.each(result.cssList,function(_,v){
            str+="<link rel='stylesheet' type='text/css' href='/stylesheet/"+v+"' class='cssList'/>"
        });
        $.each(result.jsList,function(_,v){
            str+="<script type='text/javascript' src='/javascript/"+v+"' class='jsList'><\/script>"
        });
        $('head').append(str);
    })
}
function showTemplate(option){
    let template = Handlebars.compile(option.templates);
    $('#content').html(template(option.result));
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

