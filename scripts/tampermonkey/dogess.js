// ==UserScript==
// @name         DogeSS 签到
// @namespace    https://github.com/ryuuinc/scripts
// @version      0.2
// @description  用来给 DogeSS 签到的脚本
// @author       Tienuon
// @include      *
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  const storageKey = 'dogess_last_sign_timestamp';
  const lastSignNumberOfDay = GM_getValue(storageKey);
  const currentNumberOfDay = new Date(+new Date() - 8 * 60 * 60 * 1000).getDate();

  if (currentNumberOfDay !== lastSignNumberOfDay) {
    GM_xmlhttpRequest({
      url: 'https://dogess.co/user/checkin',
      method: 'POST',
      responseType: 'json',
      onload(response) {
        if (response.status === 200) {
          const data = response.response;
          if (data === undefined) {
            GM_notification({
              text: '需要登录',
              title: 'DogeSS',
              timeout: 4000
            });
          } else {
            if (/获得了/.test(data.msg)) {
              console.info('DogeSS 签到成功！');
              GM_setValue(storageKey, currentNumberOfDay);
            } else if (/您似乎已经签到过了/.test(data.msg)) {
              console.info('DogeSS 已经签过到了。');
              GM_setValue(storageKey, currentNumberOfDay);
            } else {
              GM_notification({
                text: '签到失败',
                title: 'DogeSS',
                timeout: 4000
              });
            }
          }
        }
      }
    });
  }
})();
