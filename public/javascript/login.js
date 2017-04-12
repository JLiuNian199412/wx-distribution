$(function(){
    let loginTemplate =
        '<div class="entry">' +
        '<h1>{{title}}</h1>' +
        '<div class="body">' +
        '{{body}}' +
        '</div>' +
        '</div>';
    function showTemplate(url,templates){
        $.post(url,function(result){
            let template = Handlebars.compile(templates);
            $('#content').html(template(result))
        })
    }
    var login=function(){
        var url='http://'+window.location.host+'/users/login';
        showTemplate(url,loginTemplate)
    };
    login()
});


