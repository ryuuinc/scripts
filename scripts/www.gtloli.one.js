// ==UserScript==
// @name              GTLoLi
// @version           1.0.0
// @author            Tienuon
// @loginURL          https://www.gtloli.one/member.php?mod=logging&action=login
// @expire            900000
// @domain            www.gtloli.one
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://www.gtloli.one/plugin.php?id=k_misign:sign');
  if (/签到排名/.test(data)) {
    return '已经签到';
  }
  var m = /name="formhash" value="([^"]+)/.exec(data);
  if (!m) {
    throw '签到失败';
  }
  // 签到
  var formhash = m[1];
  var { data } = await axios.get(
    `https://www.gtloli.one/plugin.php?id=k_misign:sign&operation=qiandao&format=button&inajax=1&ajaxtarget=midaben_sign&formhash=${formhash}`
  );
  if (/签到成功/.test(data)) {
    return '签到成功';
  } else if (/今日已签/.test(data)) {
    return '已经签到';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://www.gtloli.one/plugin.php?id=k_misign:sign');
  if (/签到排名/.test(data)) {
    return true;
  }
  var m = /name="formhash" value="([^"]+)/.exec(data);
  return !!m;
};

module.exports = { run, check };
