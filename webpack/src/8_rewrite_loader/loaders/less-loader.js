let less = require("less");

function lessLoader(source) {
  let css = "";
  less.render(source, function (err, data) {
    css = data.css;
  });
  css = css.replace(/\n/g, '\\n')
  return css;
}

module.exports = lessLoader;
