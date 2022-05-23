const {rm, appendFile, writeFile, readFile, mkdir, readdir, copyFile } = require('fs/promises');
const path = require('path');

const init = async () => {
  await rm(path.join(__dirname, "project-dist"), { recursive: true, force: true });
  await mkdir(path.join(__dirname, 'project-dist'), { recursive: true } );
  const template = await readFile(path.join(__dirname, 'template.html'), { encoding: 'utf8' });

  let outputHTML = template;
  const componentFiles = await readdir(path.join(__dirname, 'components'));

  for (let componentFile of componentFiles) {
    const content = await readFile(path.join(__dirname, 'components', componentFile), { encoding: 'utf8' });
    outputHTML = outputHTML.replace('{{' + componentFile.split('.')[0] + '}}', content);
  }

  await writeFile(path.join(__dirname, 'project-dist', 'index.html'), outputHTML);
  
  const stylesFiles = await readdir(path.join(__dirname, 'styles'));
  const assetsFolders = await readdir(path.join(__dirname, 'assets'), {withFileTypes: true});

  await mkdir(path.join(__dirname, "project-dist", "assets"));
  
  await Promise.all(
    stylesFiles.map(async file => {
      const file1 = await readFile(path.join(__dirname, 'styles', file), { encoding: 'utf8' });
      return appendFile(path.join(__dirname, 'project-dist', 'style.css'), file1);
    })
  );

  const assetPromises = assetsFolders.map(async folder => {
    const srcPath = path.join(__dirname, "assets", folder.name);
    const distPath = path.join(__dirname, "project-dist", "assets", folder.name);
    await mkdir(distPath);

    const files = await readdir(srcPath);
    return Promise.all(files.map(filename => {
      return copyFile(path.join(srcPath, filename),path.join(distPath, filename));
    }));
  })

  await Promise.all(assetPromises);
}

init();