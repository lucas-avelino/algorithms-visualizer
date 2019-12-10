
var watch = require('node-watch');
const { exec } = require('child_process');
watch('src/', { recursive: true }, function(evt, name) {
  console.log('%s changed.', name);
  nameChanged = name.replace("src/","dist/").replace(".ts",".js");
  exec(`node_modules/.bin/babel ${name} --out-file ${nameChanged} --extensions`,(err, stdout, stderr) => {
    //./node_modules/.bin/babel ${name} --out-file ${nameChanged} --extensions
    if (err) {
      console.log(err);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  })
});