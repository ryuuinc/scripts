// ==UserScript==
// @name              N3RO
// @version           1.0.2
// @author            Tienuon
// @loginURL          https://n3ro.lol/auth/login
// @expire            900000
// @domain            n3ro.lol
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://n3ro.lol/user');
  if (/Sign/.test(data)) {
    throw '需要登录';
  }
  if (/您今日已签到/.test(data)) {
    return '签过了';
  }
  var { data } = await axios.post('https://n3ro.lol/user/checkin');
  if (/您似乎已经签到过了/.test(data.msg)) {
    return '签过了';
  } else if (/获得了/.test(data.msg)) {
    return '签好了';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://n3ro.lol/user');
  return !/Sign/.test(data);
};

module.exports = { run, check };
