function showTemplate(url){
    $.get(url,function(result){

    })
}
var login=function(){
   var url='http://'+window.location.host+'/login';
    showTemplate(url)
};
var register=function(){
   var url='http://'+window.location.host+'/register';
    showTemplate(url)
};

