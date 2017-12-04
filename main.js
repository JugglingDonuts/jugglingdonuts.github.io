const nunjucks = require('nunjucks');
const fs = require('fs');

const main = () => {
  const topPage = nunjucks.render('templates/top.html');
  fs.writeFileSync('docs/index.html',topPage);
  const iraiPage = nunjucks.render('templates/irai.html');
  fs.writeFileSync('docs/irai.html',iraiPage);
};

main();
