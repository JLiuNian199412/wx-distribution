$(function(){
    let loginTemplate =
        '<div class="entry">' +
        '<h1>{{title}}</h1>' +
        '<div class="body">' +
        '{{body}}' +
        '</div>' +
        '</div>';

    var login=function(){
        let option={};
        option.templates=loginTemplate;
        option.result='';
        option.title='登录';
        showTemplate(option)
    };
    login()
});


