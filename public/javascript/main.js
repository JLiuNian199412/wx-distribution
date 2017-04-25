function loadLib(url,option){
    let str='';
    let str2='';
    $('.cssList').remove();
    $('.jsList').remove();
    $.get(url,function(result){
        $.each(result.cssList,function(_,v){
            str+="<link rel='stylesheet' type='text/css' href='/stylesheet/"+v+"' class='cssList'/>"
        });
        $.each(result.jsList,function(_,v){
            str2+="<script type='text/javascript' src='/javascript/"+v+"' class='jsList'><\/script>"
        });
        $('head').append(str);
        $('footer').append(str2);
        option.result=result.val;
        showTemplate(option)
    })
}
function showTemplate(option){
    let template = Handlebars.compile(localStorage.getItem('template'));
    $('#content').html(template(option.result));
    $('#content').html(ui.template);
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
    if(document.getElementById("aui-slide")){
        var slide = new auiSlide({
            container:document.getElementById("aui-slide"), //容器
            // "width":300, //宽度
            "height":184, //高度
            "speed":500, //速度
            "autoPlay": 3000, //自动播放
            "loop":true,//是否循环
            "pageShow":true,//是否显示分页器
            "pageStyle":'dot', //分页器样式，分dot,line
            'dotPosition':'center' //当分页器样式为dot时控制分页器位置，left,center,right
        });
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

