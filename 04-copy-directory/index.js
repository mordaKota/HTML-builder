
const { rm, mkdir, readdir, copyFile } = require('fs/promises');
const path = require('path');
const files = path.join(__dirname, 'files');
const copy = path.join(__dirname, 'files-copy');

const init = async () => {
  await rm(copy, { recursive: true, force: true });
  await mkdir(copy);
  const fileNames = await readdir(files);
  await Promise.all(
    fileNames.map(n => copyFile(path.join(files, n), path.join(copy, n)))
  );
}

init();
