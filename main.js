const nunjucks = require('nunjucks');
const fs = require('fs');

const main = () => {
  const topPage = nunjucks.render('templates/top.html');
  fs.writeFileSync('docs/index.html',topPage);
};

main();
