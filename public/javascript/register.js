$(function(){
    let registerTemplate =
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
    var register=function(){
        var url='http://'+window.location.host+'/register';
        showTemplate(url,registerTemplate)
    };
});
