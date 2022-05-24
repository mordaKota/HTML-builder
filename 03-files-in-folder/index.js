const fs = require('fs');
const path = require('path');

const secretPath = path.join(__dirname, 'secret-folder');
console.log(secretPath);

fs.readdir(secretPath, { withFileTypes: true }, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log("\nSecret Folder Files:");
    files.forEach(file => 
      {
        fs.stat(path.join(secretPath, file.name), (err, stats) => {
          if (err) {
            console.log(err);
          } 
          if (!stats.isDirectory()) {
            console.log(file.name.split('.').slice(0, -1).join('.') + " - " + path.extname(file.name).slice(1) + " - " + ((Math.round(stats.size/1024)) + 'Kb'));
          }
        })
        
      });
  }
})