// ==UserScript==
// @name         腾讯课堂显示 QQ 号
// @namespace    tencent-course
// @compatible   Chrome
// @description  自动在腾讯课堂聊天框内显示用户的 QQ 号
// @version      1.1
// @author       Sheey
// @match        *://ke.qq.com/webcourse/index.html*
// @run-at       document-end
// @grant        none
// ==/UserScript==

/*jshint esversion: 6 */

let num_chat = 0;

function addListener() {
    var ele = document.querySelector('.chat-list');
    if(ele != null){
        ele.addEventListener('DOMSubtreeModified', (event) => {
            let a = document.querySelectorAll('.chat-item.chat-item-msg');
            if(num_chat == a.length) return;
            num_chat = a.length
            for(let child of a){
                let name = child.children[0].querySelector('.member-item-inner-fullline').innerText;
                if(name.endsWith('）'))continue;
                if(name == '') continue;
                let qq = child.children[1].dataset.uin;
                child.children[0].querySelector('.member-item-inner-fullline').innerText = name + "（" + qq + "）";
            }
        });
    }else{
        setTimeout(addListener, 1000);
    }
}

(function() {
    'use strict';
    setTimeout(addListener, 1000);
})();
