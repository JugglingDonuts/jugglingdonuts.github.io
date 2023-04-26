require('dotenv').config();
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
  shell.cp('templates/jm.html', 'public/jm.html');

  const jdlYear = process.env.WITH_JDL;
  writePage('templates/top.html', 'public/index.html',{jdlYear});

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

  const iraiFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSf5pHW7KXhTDXpM4smg3CeABYJ1kn80m5_HiDdt7044Not1FA/viewform?usp=pp_url';
  writePage('templates/irai.html','public/irai.html',{iraiFormUrl});

  if(jdlYear) {
    console.log(`with jdl ${jdlYear}`);
    const jdl = loadToml(`jdl/${jdlYear}.toml`);
    writePage('templates/jdl.html','public/jdl.html',jdl);
  }
};

main();
