const nunjucks = require('nunjucks');
const toml = require('toml');
const fs = require('fs');

const main = () => {
  const topPage = nunjucks.render('templates/top.html');
  fs.writeFileSync('docs/index.html',topPage);

  const years = fs.readdirSync('members').sort().reverse().map(f => f.substr(0,4));
  const active = years.slice(0,4);
  const inactive = years.slice(4);
  const membersPage = nunjucks.render('templates/members.html', {"years": active});
  fs.writeFileSync('docs/members.html',membersPage);
  active.forEach((year) => {
    const memberData = fs.readFileSync(`members/${year}.toml`);
    let members;
    try {
      members = toml.parse(memberData).members;
    } catch(e) {
      console.error(`Parse Error: ${e.line} in members/${year}.toml`);
      process.exit(1);
    }
    const memberPage = nunjucks.render('templates/member.html', {year, members});
    fs.writeFileSync(`docs/members/${year}.html`, memberPage);
  });

  const oldMember = inactive.map((year) => {
    const memberData = fs.readFileSync(`members/${year}.toml`);
    let members;
    try {
      members = toml.parse(memberData).members;
    } catch(e) {
      console.error(`Parse Error: ${e.line} in members/${year}.toml`);
      process.exit(1);
    }

    const isLast = year === '2007';
    return {year, members, isLast};
  });
  const oldMemberPage = nunjucks.render('templates/old_member.html', {"data": oldMember});
  fs.writeFileSync('docs/members/obog.html', oldMemberPage);

  const iraiPage = nunjucks.render('templates/irai.html');
  fs.writeFileSync('docs/irai.html',iraiPage);
};

main();
