/*
 * File: /Users/origami/Desktop/dl-projects/scripts/normalize.js
 * Project: /Users/origami/Desktop/dl-projects/scripts
 * Created Date: Monday May 13th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday May 13th 2019 7:25:33 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const {
  rename,
  readDir,
  exists,
  getExtensionName,
  filterFiles,
} = require('./helper');
const addZero = str => {
  const recur = () => {
    const lack = 9 - str.length;
    let returned = '';
    for (let i = 0; i < lack; i++) {
      returned = returned + '0';
    }
    return returned;
  };
  return recur() + str;
};
function nomralize(folder) {
  console.log('start normalize');
  folder = folder.replace('/', '');
  const filenames = filterFiles(readDir(folder));
  const temp = [];
  filenames.forEach((filename, index) => {
    const oldFile = folder + '/' + filename;
    const newName = addZero(index.toString());
    // if(exists(newFile)){
    //     const tempName = Date.now()+'.'+
    //     rename(newFile,Date.now())
    // }
    rename(oldFile, newName);
  });
  console.log('normalize end');
}

module.exports = nomralize;
