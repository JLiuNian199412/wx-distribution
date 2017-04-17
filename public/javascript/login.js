$(function(){
    let loginTemplate =
        '<div class="entry">' +
        '<h1>{{title}}</h1>' +
        '<div class="body">' +
        '{{body}}' +
        '</div>' +
        '</div>';

    var login=function(){
        var url='/users/login';
        showTemplate(url,loginTemplate,'','登录','')
    };
    login()
});


