/*
 * File: /Users/origami/Desktop/dl-projects/scripts/csvHandler.js
 * Project: /Users/origami/Desktop/dl-projects/scripts
 * Created Date: Tuesday May 21st 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Tuesday May 21st 2019 5:48:05 pm
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const { readFile, write } = require('./helper');
const formated = readFile('./list_attr_celeba.csv')
  .replace('\r', '')
  .split('\n');
const labels = formated[0].split(',');
let res = 'image_id,label' + '\n';
for (let i = 1; i < formated.length; i++) {
  //   if (i >= 10) break;
  const row = formated[i];
  const tags = row
    .split(',')
    .map((i, idx) => {
      if (idx === 0) return null;
      return i.replace('\r', '') == '1' ? labels[idx] : null;
    })
    .filter(o => o !== null)
    .join(' ');
  res =
    res +
    row.split(',')[0] +
    ',' +
    tags +
    (i === formated.length - 1 ? '' : '\n');
}
write('list_attr_celeba_fixed.csv', res);
