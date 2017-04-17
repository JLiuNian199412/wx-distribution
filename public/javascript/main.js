function showTemplate(url,templates,left,middle,right){
    $.post(url,function(result){
        let template = Handlebars.compile(templates);
        $('#content').html(template(result));
        $('.aui-title').html(middle);
        $('.aui-pull-left').html(left);
        $('.aui-pull-right').html(right)
    })
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

