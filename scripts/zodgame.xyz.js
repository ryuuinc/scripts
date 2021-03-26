// ==UserScript==
// @name              ZodGame
// @version           1.0.0
// @author            Tienuon
// @loginURL          https://zodgame.xyz/member.php?mod=logging&action=login&referer=https%3A%2F%2Fzodgame.xyz%2Findex.php
// @expire            900000
// @domain            zodgame.xyz
// ==/UserScript==

let run = async function (param) {
  var { data } = await axios.get(
    'https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign&576989e1&infloat=yes&handlekey=dsu_paulsign&inajax=1&ajaxtarget=fwin_content_dsu_paulsign'
  );
  if (/已经签到/.test(data)) {
    return '已经签到';
  }
  var m = /name="formhash" value="([^"]+)/.exec(data);
  if (!m) {
    throw '签到失败';
  }
  var formhash = m[1];
  var { data } = await axios.post(
    'https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign&operation=qiandao&infloat=1&sign_as=1&inajax=1',
    `formhash=${formhash}&qdxq=kx`
  );
  if (/签到成功/.test(data)) {
    return '签到成功';
  } else if (/已经签到/.test(data)) {
    return '已经签到';
  } else {
    throw '签到失败';
  }
};

let check = async function (param) {
  var { data } = await axios.get(
    'https://zodgame.xyz/plugin.php?id=dsu_paulsign:sign&576989e1&infloat=yes&handlekey=dsu_paulsign&inajax=1&ajaxtarget=fwin_content_dsu_paulsign'
  );
  if (/已经签到/.test(data)) {
    return true;
  }
  var m = /name="formhash" value="([^"]+)/.exec(data);
  return !!m;
};

module.exports = { run, check };
