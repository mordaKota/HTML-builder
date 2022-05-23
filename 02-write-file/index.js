const fs = require('fs');
const path = require('path');
const output = fs.createWriteStream(path.join(__dirname, 'text2.txt'));

const exit = () => {
  process.stdout.write('The program will be closed. Bye!');
  process.exit();
}

process.stdout.write('Please add some text to save or type "exit" to close \n');
process.stdin.on('data', chunk => {
  chunk.toString().trim() === 'exit' ? exit() : output.write(chunk)
});

process.on('SIGINT', exit);

