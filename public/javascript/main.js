function loadLib(url){
    let str='';
    let str2='';
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
    }
    $.get(url,function(result){
        $.each(result.cssList,function(_,v){
            str+="<link rel='stylesheet' type='text/css' href='/stylesheet/"+v+"' class='cssList'/>"
        });
        $.each(result.jsList,function(_,v){
            str2+="<script type='text/javascript' src='/javascript/"+v+"' class='jsList'><\/script>"
        });
        $('.cssList').remove();
        $('.jsList').remove();
        $('head').append(str);
        $('footer').append(str2);
        option.result=result.val;
        option.type=result.type;
        showTemplate(option)
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
    if(option.type=='home'){
        homeJsLoad()
    }else if(option.type=='shop'){
        shopJsLoad()
    }else if(option.type=='store'){
        shopJsLoad()
    }else if(option.type=='shopCart'){
        shopJsLoad()
    }else if(option.type=='mine'){
        shopJsLoad()
    }else if(option.type=='search'){
        searchJsLoad()
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

