// ==UserScript==
// @name              V2EX
// @version           1.0.2
// @author            Tienuon
// @loginURL          https://www.v2ex.com/signin
// @expire            900000
// @domain            www.v2ex.com
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://www.v2ex.com/mission/daily');
  if (/你要查看的页面需要先登录/.test(data)) {
    throw '需要登录';
  }
  if (/每日登录奖励已领取/.test(data)) {
    return '签过了';
  }
  var once = /redeem\?once=(.*?)'/.exec(data);
  if (!once) {
    throw '未找到 once';
  }
  var { data } = await axios.get(`https://www.v2ex.com/mission/daily/redeem?once=${once[1]}`);
  if (/请重新点击一次以领取每日登录奖励/.test(resp1.data)) {
    throw '请重新签到';
  } else if (/每日登录奖励已领取/.test(resp1.data)) {
    return '签好了';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://www.v2ex.com/t/718092');
  return !/现在注册/.test(data);
};

module.exports = { run, check };