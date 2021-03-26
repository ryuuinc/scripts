// ==UserScript==
// @name              N3RO
// @version           1.0.0
// @author            Tienuon
// @loginURL          https://n3ro.lol/auth/login
// @expire            900000
// @domain            n3ro.lol
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.post('https://n3ro.lol/user/checkin');
  if (/获得了/.test(data.msg)) {
    return '签到成功';
  } else if (/您似乎已经签到过了/.test(data.msg)) {
    return '已经签到';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://n3ro.lol/user');
  return /用户中心/.test(data);
};

module.exports = { run, check };
