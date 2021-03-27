// ==UserScript==
// @name              GTLoLi
// @version           1.0.2
// @author            Tienuon
// @loginURL          https://www.gtloli.one/member.php?mod=logging&action=login
// @expire            900000
// @domain            www.gtloli.one
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://www.gtloli.one/plugin.php?id=k_misign:sign');
  if (/注册/.test(data)) {
    throw '需要登录';
  }
  if (/签到排名/.test(data)) {
    return '签过了';
  }
  var hideform = /name="formhash" value="([^"]+)/.exec(data);
  if (!hideform) {
    throw '未找到 hideform';
  }
  // 签到
  var formhash = hideform[1];
  var { data } = await axios.get(
    `https://www.gtloli.one/plugin.php?id=k_misign:sign&operation=qiandao&format=button&inajax=1&ajaxtarget=midaben_sign&formhash=${formhash}`
  );
  if (/今日已签/.test(data)) {
    return '签过了';
  } else if (/签到成功/.test(data)) {
    return '签好了';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://www.gtloli.one/plugin.php?id=k_misign:sign');
  return !/注册/.test(data);
};

module.exports = { run, check };
