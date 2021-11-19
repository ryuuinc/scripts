// ==UserScript==
// @name         V2EX 签到
// @namespace    https://github.com/ryuuinc/scripts
// @version      0.2
// @description  用来给 V2EX 签到的脚本
// @author       Tienuon
// @match        *://v2ex.com/*
// @match        *://*.v2ex.com/*
// @run-at       document-start
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_notification
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
  'use strict';

  const storageKey = 'v2ex_last_sign_timestamp';
  const lastSignNumberOfDay = GM_getValue(storageKey);
  const currentNumberOfDay = new Date(+new Date() - 8 * 60 * 60 * 1000).getDate();

  if (currentNumberOfDay !== lastSignNumberOfDay) {
    GM_xmlhttpRequest({
      url: 'https://www.v2ex.com/mission/daily',
      method: 'GET',
      onload(response) {
        if (response.status === 200) {
          const data = response.response;
          if (/你要查看的页面需要先登录/.test(data)) {
            GM_notification({
              text: '需要登录',
              title: 'V2EX',
              timeout: 4000
            });
          }
          if (/每日登录奖励已领取/.test(data)) {
            console.info('V2EX 已经签过到了。');
            GM_setValue(storageKey, currentNumberOfDay);
          } else {
            const hideform = /redeem\?once=(.*?)'/.exec(data);
            if (!hideform) {
              GM_notification({
                text: '未知错误',
                title: 'V2EX',
                timeout: 4000
              });
            } else {
              const once = hideform[1];
              GM_xmlhttpRequest({
                url: `https://www.v2ex.com/mission/daily/redeem?once=${once}`,
                method: 'GET',
                onload(response) {
                  if (response.status === 200) {
                    const data = response.response;
                    if (/请重新点击一次以领取每日登录奖励/.test(data)) {
                      GM_notification({
                        text: '请重新签到',
                        title: 'V2EX',
                        timeout: 4000
                      });
                    } else if (/每日登录奖励已领取/.test(data)) {
                      console.info('V2EX 签到成功！');
                      GM_setValue(storageKey, currentNumberOfDay);
                    } else {
                      GM_notification({
                        text: '签到失败',
                        title: 'V2EX',
                        timeout: 4000
                      });
                    }
                  }
                }
              });
            }
          }
        }
      }
    });
  }
})();
