require("dotenv").config();
const nunjucks = require("nunjucks");
const toml = require("toml");
const fs = require("fs");
const shell = require("shelljs");

const loadToml = (fn) => {
  const content = fs.readFileSync(fn);
  let data;
  try {
    data = toml.parse(content);
  } catch (e) {
    console.error(`Parse Error: ${e.line} in ${fn}`);
    process.exit(1);
  }
  return data;
};

const writePage = (template, output, data) => {
  const page = nunjucks.render(template, data);
  fs.writeFileSync(output, page);
};

const main = () => {
  if (fs.existsSync("public")) {
    shell.rm("-r", "public");
  }
  shell.mkdir("public");
  shell.mkdir("public/members");

  // copy static files
  shell.cp("-r", "css", "public/css");
  shell.cp("-r", "img", "public/img");
  shell.cp("templates/404.html", "public/404.html");

  const jdlYear = process.env.WITH_JDL;
  const jdlRelease = process.env.RELEASE == "true";
  if (jdlYear || jdlRelease) {
    if (jdlRelease) {
      console.log(`with jdl ${jdlYear} (release)`);
    } else {
      console.log(`with jdl ${jdlYear} (test)`);
    }
    const jdl = loadToml(`jdl/${jdlYear}.toml`);
    writePage("templates/index.html", "public/index.html", {
      jdlYear,
      jdlRelease,
      jdl,
    });
    writePage("templates/jdl.html", `public/jdl${jdlYear}.html`, jdl);
  } else {
    writePage("templates/index.html", "public/index.html", {});
  }

  const years = fs
    .readdirSync("members")
    .sort()
    .reverse()
    .map((f) => f.substring(0, 4));
  const active = years.slice(0, 4);
  const inactive = years.slice(4);
  writePage("templates/members.html", "public/members.html", {
    years: active,
    has_slider: true,
  });
  active.forEach((year) => {
    const members = loadToml(`members/${year}.toml`).members;
    writePage("templates/member.html", `public/members/${year}.html`, {
      year,
      members,
    });
  });

  const oldMember = inactive.map((year) => {
    const members = loadToml(`members/${year}.toml`).members;
    const isLast = year === "2007";
    return { year, members, isLast };
  });
  writePage("templates/old_member.html", "public/members/obog.html", {
    data: oldMember,
  });

  const iraiFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf5pHW7KXhTDXpM4smg3CeABYJ1kn80m5_HiDdt7044Not1FA/viewform?usp=pp_url";
  writePage("templates/irai.html", "public/irai.html", {
    iraiFormUrl,
    has_slider: true,
  });
};

main();
