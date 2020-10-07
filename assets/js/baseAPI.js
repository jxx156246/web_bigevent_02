$(function() {
    var baseurl = 'http://ajax.frontend.itheima.net';
    $.ajaxPrefilter(function(options) {
        options.url = baseurl + options.url;
    })
})