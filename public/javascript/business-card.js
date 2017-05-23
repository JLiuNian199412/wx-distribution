let template=
    '<div class="spread-info">'+
    '<img src="/images/member-photo-img.jpeg">'+
    '<div class="spread-info-text">'+
    '<h4>我是<span class="info-color">[liunian]</span></h4>'+
    '<p>我为<span class="info-color">touch微分销</span>代言</p>'+
    '</div>'+
    '</div>'+
    '<div class="spread-img">'+
    '<img src="/images/tg-dp.png" alt="">'+
    '<div class="card-content" id="qrcode"></div>'+
    '</div>';
localStorage.setItem('template',template);
function CurrentJsLoad(){
    $('.spread-img').height(document.body.clientHeight-$('.spread-info').outerHeight(true));
    $('.spread-info img').click(function () {
        loadLib('/store-manage')
    });
    jQuery('#qrcode').qrcode({
        render  : "canvas",//也可以替换为table
        width   : 130,
        height  : 130,
        text    : "http://www.jq22.com"
    });
}