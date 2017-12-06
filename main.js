const nunjucks = require('nunjucks');
const toml = require('toml');
const fs = require('fs');

const main = () => {
  const topPage = nunjucks.render('templates/top.html');
  fs.writeFileSync('docs/index.html',topPage);

  const years = [2016,2015];
  const membersPage = nunjucks.render('templates/members.html', {years});
  fs.writeFileSync('docs/members.html',membersPage);
  years.forEach((year) => {
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

  const iraiPage = nunjucks.render('templates/irai.html');
  fs.writeFileSync('docs/irai.html',iraiPage);
};

main();
