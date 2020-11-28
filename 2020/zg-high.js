// ==UserScript==
// @name         高亮中公接口
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://iip.eoffcn.com/v1/package/manage/getPackageCatelog?package_id=*&product=3&sso_id=1&version=5.3.2
// @require      https://cdn.jsdelivr.net/npm/jquery@1.11.0/dist/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/YQHP-Happi/soluow-resouces-repos@images-8/2020/zg-high.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
   var body = $('body');
   var json = JSON.parse($('#json').text());
    if(json.retcode !== 0){
        return;
    }

    for(var d of json.data.list){
        var dl = $('<dl></dl>');
        dl.append(`<dt>${d.title}</dt>`)
        var i = 0;
        for(var item of d.children){
            var dd ;
            // pdf讲义
            if(item.module_type == 7){
                 dd = $(`<dd>${item.name}</dd>`);
                var ol = $('<ol></ol>');
                 for(var pdf of item.pdf_info){
                   ol.append(`<li><a href='${pdf.url}' target='_blank'>${pdf.name}</a></li>`)
                 }
                dd.append(ol);
            }else if(item.module_type == 6){
                 dd = $(`<dd><a href='http://pcvod.offcncloud.com/#/vod?account=${item.room_id}' target='_blank'>${++i}.${item.name}.ts</a></dd>`);
            }else if(item.module_type == 1){
                 dd = $(`<dd><a href='${item.url}' target='_blank'>${item.name}</a></dd>`);
            }
            dl.append(dd)

        }
       body.append(dl);

    }
    $('dl').css('margin-left','10px');

})();
