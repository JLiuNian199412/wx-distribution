$(function(){
    $('.aui-pull-right.aui-btn').click(function(){
        $.get('http://'+window.location.host+'/users/login',function(result){
            var str='';
            if(result.cssList){
                $.each(result.cssList,function(_,v){
                    str+="<link rel='stylesheet' type='text/css' href='/stylesheet/"+v+"' class='cssList'/>"
                });
            }
           if(result.jsList){
               $.each(result.jsList,function(_,v){
                   str+="<script type='text/javascript' src='/javascript/"+v+"' class='jsList'><\/script>"
               });
           }
            $('head').append(str);
        });
    })
});