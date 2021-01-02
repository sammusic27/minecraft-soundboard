const fs = require('fs');
const jsonObj = {};

function parseFiles(pathFolder = './assets', type = '_'){
  const files = fs.readdirSync(pathFolder);

  files.forEach(file => {
    const currentPlace = pathFolder + '/' + file;
    const stat = fs.statSync(currentPlace)

    if(stat.isDirectory()){
      parseFiles(currentPlace, file);
    } else {
      setObj(currentPlace, file, type);
    }
  });
}

function setObj(path, filename, type){
  if(jsonObj[type] === undefined){
    jsonObj[type] = [];
  }
  jsonObj[type].push({
    path,
    filename,
  });
}

parseFiles();

let data = JSON.stringify(jsonObj, null, 2);
fs.writeFileSync('./json/soundboard-paths.json', data);