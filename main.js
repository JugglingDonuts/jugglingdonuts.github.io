const nunjucks = require('nunjucks');
const toml = require('toml');
const fs = require('fs');
const shell = require('shelljs');

const loadToml = (fn) => {
  const content = fs.readFileSync(fn);
  let data;
  try {
    data = toml.parse(content);
  } catch(e) {
    console.error(`Parse Error: ${e.line} in ${fn}`);
    process.exit(1);
  }
  return data;
};

const writePage = (tmp, output, data) => {
  const page = nunjucks.render(tmp,data);
  fs.writeFileSync(output, page);
};

const main = () => {
  if (fs.existsSync('public')) {
    shell.rm('-r', 'public');
  }
  shell.mkdir('public');
  shell.mkdir('public/css');
  shell.mkdir('public/members');

  // copy img
  shell.cp('-r', 'img', 'public/img');

  shell.cp('templates/404.html', 'public/404.html');

  writePage('templates/top.html', 'public/index.html');

  const years = fs.readdirSync('members').sort().reverse().map(f => f.substr(0,4));
  const active = years.slice(0,4);
  const inactive = years.slice(4);
  writePage('templates/members.html','public/members.html',{"years": active});
  active.forEach((year) => {
    const members = loadToml(`members/${year}.toml`).members;
    writePage('templates/member.html',`public/members/${year}.html`,{year,members});
  });

  const oldMember = inactive.map((year) => {
    const members = loadToml(`members/${year}.toml`).members;
    const isLast = year === '2007';
    return {year, members, isLast};
  });
  writePage('templates/old_member.html','public/members/obog.html',{"data": oldMember});

  const iraiFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf_oz0aqanJrUwnZZmWay6z2-9HIfsqKpbbHPWgml7gPsKF4w/viewform';
  writePage('templates/irai.html','public/irai.html',{iraiFormUrl});

  const jdl = loadToml('jdl/2017.toml');
  jdl['ticket'] = jdl.staffs.find(s => s.position === "チケット").name;
  jdl['kouhou'] = jdl.staffs.find(s => s.position === "広報").name;
  writePage('templates/jdl.html','public/jdl.html',jdl);
};

main();
