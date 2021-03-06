const webpack = require("webpack");
const path = require('path');
const fs = require('fs');
const os = require('os');
const config = require('../webpack.config.js');
let key;

try {
  key = fs.readFileSync(path.resolve(os.homedir(), 'churchie_key.pem'));
} catch (e) {
  console.log("'~/churchie_key.pem' does not exist! Get this key from the project owner!");
  process.exit(0);
}

const ChromeExtension = require("crx");
const crx = new ChromeExtension({
  codebase: "http://localhost:8000/myFirstExtension.crx",
  privateKey: key,
});

const compiler = webpack(config);
compiler.run(function(err, stats) {
  if(err) {
    throw err;
  }
  crx.load([
    './client/manifest.json',
    './client/icon.png',
    // Ideally I'd like this to just loop over all of the outputted webpack bundles but for now it's a manual job, oh well
    './bundles/dom-script.bundle.js',
    './bundles/toolbar-menu.bundle.js',
    './client/src/toolbar-menu-bundle/index.html',
    './client/src/background/index.js',
  ])
  .then(crx => crx.pack())
  .then((crxBuffer) => {
    fs.access('./packaged', (err) => {
      if (err) {
        fs.mkdirSync('./packaged');
      }
      fs.writeFileSync(`./packaged/churchie.crx`, crxBuffer);
      console.log("All good! Chrome extension packaged!");
      process.exit(0);
    });
  })
  .catch(e => console.log('found some error', e));
});
