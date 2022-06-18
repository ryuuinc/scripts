// ==UserScript==
// @name              DOGESS
// @version           1.0.4
// @author            Tienuon
// @loginURL          https://dogess.one/auth/login
// @expire            900000
// @domain            dogess.one
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://dogess.one/user');
  if (/登录用户中心/.test(data)) {
    throw '需要登录';
  }
  if (/您今日已签到/.test(data)) {
    return '已签到';
  }
  var { data } = await axios.post('https://dogess.one/user/checkin');
  if (/您似乎已经签到过了/.test(data.msg)) {
    return '已签到';
  } else if (/获得了/.test(data.msg)) {
    return '签到成功';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://dogess.one/user');
  return !/登录用户中心/.test(data);
};

module.exports = { run, check };
