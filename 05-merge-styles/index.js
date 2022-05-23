const fs = require('fs');
const path = require('path');
var output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (path.extname(file) === '.css') {
        fs.createReadStream(path.join(__dirname, 'styles', file)).pipe(output);
      }
    })
  }
});
