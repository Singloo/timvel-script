/*
 * File: /Users/origami/Desktop/dl-projects/scripts/labelFolder.js
 * Project: /Users/origami/Desktop/dl-projects/scripts
 * Created Date: Sunday May 12th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Monday May 13th 2019 7:25:43 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const { readDir, filterFiles, write, createFile } = require('./helper');

function labelFolder(folder, tag, output = 'csv') {
  if (!folder) throw new Error('No folder provided');
  folder = folder.replace('/', '');
  console.log('start label');
  const files = filterFiles(readDir(folder));
  let str = files.map(name => folder + '/' + name + ',' + tag).join('\n');
  if (output === 'csv') {
    str = 'name,label\n' + str;
  }
  const outputFilename = folder + '.' + output;
  createFile(outputFilename);
  write(outputFilename, str);
  console.log('label done');
}
module.exports = labelFolder;
