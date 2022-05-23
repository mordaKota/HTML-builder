const fs = require('fs');
const path = require('path');

const secretPath = path.join(__dirname, 'secret-folder');
console.log(secretPath);

fs.readdir(secretPath, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    console.log("\nSecret Folder Files:");
    files.forEach(file => 
      {
        fs.stat(path.join(secretPath, file), (err, stats) => {
          if (err) {
            console.log(err);
          } 
          if (!stats.isDirectory()) {
            console.log(file);
          }
        })
        
      });
  }
})