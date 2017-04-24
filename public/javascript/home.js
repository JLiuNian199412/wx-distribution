$(function(){
    $('.aui-pull-right.aui-btn').click(function(){
        loadLib('/users/login');
    });
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
    })
});