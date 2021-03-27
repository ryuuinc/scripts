// ==UserScript==
// @name              ZodGame
// @version           1.0.2
// @author            Tienuon
// @loginURL          https://zodgame.xyz/member.php?mod=logging&action=login&referer=https%3A%2F%2Fzodgame.xyz%2Findex.php
// @expire            900000
// @domain            zodgame.xyz
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get('https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign');
  if (/注册/.test(data)) {
    throw '需要登录';
  }
  if (/已经签到/.test(data)) {
    return '签过了';
  }
  var hideform = /name="formhash" value="([^"]+)/.exec(data);
  if (!hideform) {
    throw '未找到 hideform';
  }
  var formhash = hideform[1];
  var { data } = await axios.post(
    'https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&sign_as=1&inajax=1',
    `formhash=${formhash}&qdxq=kx`
  );
  if (/已经签到/.test(data)) {
    return '签过了';
  } else if (/签到成功/.test(data)) {
    return '签好了';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get('https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign');
  return !/注册/.test(data);
};

module.exports = { run, check };
