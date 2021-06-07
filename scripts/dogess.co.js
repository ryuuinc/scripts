// ==UserScript==
// @name              DOGESS
// @version           1.0.3
// @author            Tienuon
// @loginURL          https://dogess.co/auth/login
// @expire            900000
// @domain            dogess.co
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://dogess.co/user');
  if (/登录/.test(data)) {
    throw '需要登录';
  }
  if (/您今日已签到/.test(data)) {
    return '签过了';
  }
  var { data } = await axios.post('https://dogess.co/user/checkin');
  if (/您似乎已经签到过了/.test(data.msg)) {
    return '签过了';
  } else if (/获得了/.test(data.msg)) {
    return '签好了';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://dogess.co/user');
  return !/登录/.test(data);
};

module.exports = { run, check };
