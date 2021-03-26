// ==UserScript==
// @name              V2EX
// @version           1.0.0
// @author            Tienuon
// @loginURL          https://v2ex.com/signin
// @expire            900000
// @domain            v2ex.com
// ==/UserScript==

let run = async function (param) {
  if (!(await check(param))) {
    throw '需要登录';
  }
  var resp = await axios.get('https://www.v2ex.com/mission/daily');
  if (/你要查看的页面需要先登录/.test(resp.data)) {
    throw '需要登录';
  }
  if (/每日登录奖励已领取/.test(resp.data)) {
    return '重复签到';
  }
  var once = /redeem\?once=(.*?)'/.exec(resp.data);
  if (!once) {
    throw '未找到 once';
  }
  var resp1 = await axios.get(`https://www.v2ex.com/mission/daily/redeem?once=${once[1]}`);
  if (/请重新点击一次以领取每日登录奖励/.test(resp1.data)) {
    throw '请重新签到';
  } else if (/每日登录奖励已领取/.test(resp1.data)) {
    let resp = await axios.get('https://www.v2ex.com/balance');
    let today = new Date(Date.now()).toISOString().replace(/[^0-9]/g, '');
    let reward = RegExp(`${today.slice(0, 8)} 的每日登录奖励 (\\d+) 铜币`, 'g').exec(resp.data);
    if (reward) {
      return `签到奖励: ${reward[1]} 铜币`;
    } else {
      return '成功签到';
    }
  } else {
    throw '无法确认签到结果';
  }
};

let check = async function (param) {
  var resp = await axios.get('https://www.v2ex.com/t/718092');
  return !/现在注册/.test(resp.data);
};

module.exports = { run, check };
