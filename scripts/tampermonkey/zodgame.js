// ==UserScript==
// @name         ZodGame 签到
// @namespace    https://github.com/ryuuinc/scripts
// @version      0.1
// @description  用来给 DogeSS 签到的脚本
// @author       Tienuon
// @match        *://zodgame.xyz/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  const storageKey = 'zodgame_last_sign_timestamp';
  const lastSignNumberOfDay = GM_getValue(storageKey);
  const currentNumberOfDay = Math.floor(
    (new Date().valueOf() - 8 * 60 * 60 * 1000) / 1000 / 60 / 60 / 24
  );

  if (currentNumberOfDay !== lastSignNumberOfDay) {
    GM_xmlhttpRequest({
      url: 'https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign',
      method: 'GET',
      onload(response) {
        if (response.status === 200) {
          const data = response.response;
          if (/注册帐号/.test(data)) {
            GM_notification({
              text: '需要登录',
              title: 'ZodGame',
              timeout: 4000
            });
          }
          if (/已经签到/.test(data)) {
            console.info('ZodGame 已经签过到了。');
            GM_setValue(storageKey, currentNumberOfDay);
          } else {
            const hideform = /name="formhash" value="([^"]+)/.exec(data);
            const formhash = hideform[1];
            GM_xmlhttpRequest({
              url: `https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&sign_as=1&inajax=1&qdxq=kx&formhash=${formhash}`,
              method: 'POST',
              onload(response) {
                if (response.status === 200) {
                  const data = response.response;
                  if (/签到成功/.test(data)) {
                    console.info('ZodGame 签到成功！');
                    GM_setValue(storageKey, currentNumberOfDay);
                  } else {
                    GM_notification({
                      text: '签到失败',
                      title: 'ZodGame',
                      timeout: 4000
                    });
                  }
                }
              }
            });
          }
        }
      }
    });
  }
})();
