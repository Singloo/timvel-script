/*
 * File: /Users/origami/Desktop/dl-projects/scripts/helper.js
 * Project: /Users/origami/Desktop/dl-projects/scripts
 * Created Date: Sunday May 12th 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday May 23rd 2019 9:53:30 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const fs = require('fs');
const path = require('path');
const createFile = filename => {
  if (fs.existsSync(filename)) fs.unlinkSync(filename);
  fs.writeFileSync(filename);
};
const write = (path, content) => {
  fs.writeFileSync(path, content);
};
const append = (path, content) => {
  fs.appendFileSync(path, content);
};
const getExtensionName = path.extname;
const getFilename = path.basename;
const getFilenameWithoutExt = _path =>
  getFilename(_path).replace(getExtensionName(_path), '');
const readDir = fs.readdirSync;

const rename = (_path, newName, keepFile = false) => {
  fs.renameSync(_path, _path.replace(getFilenameWithoutExt(_path), newName));
  // if (!keepFile) fs.unlinkSync(_path);
};
const EXCLUDED = ['.DS_Store'];
const filterFiles = filenames => filenames.filter(o => !EXCLUDED.includes(o));
const exists = fs.existsSync;
const readFile = path => fs.readFileSync(path, { encoding: 'utf8' });
const resolve = path.resolve;
module.exports = {
  exists,
  getExtensionName,
  getFilename,
  getFilenameWithoutExt,
  readDir,
  rename,
  filterFiles,
  createFile,
  write,
  append,
  readFile,
  resolve,
};
