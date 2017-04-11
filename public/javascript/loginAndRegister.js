$(function(){
    var tpl=require('../template/loginAndRegistertpl')
    function showTemplate(url){
        $.post(url,templates,function(result){
            let template = Handlebars.compile(templates)
            $('#content').html(template(result))
        })
    }
    var login=function(){
        var url='http://'+window.location.host+'/login';
        showTemplate(url,tpl.logintpl)
    };
    var register=function(){
        var url='http://'+window.location.host+'/register';
        showTemplate(url,tpl.registertpl)
    };
})


