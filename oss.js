/*
 * File: /Users/origami/Desktop/dl-projects/scripts/oss.js
 * Project: /Users/origami/Desktop/dl-projects/scripts
 * Created Date: Thursday May 23rd 2019
 * Author: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 * Last Modified: Thursday May 23rd 2019 10:00:55 am
 * Modified By: Rick yang tongxue(🍔🍔) (origami@timvel.com)
 * -----
 */
const OSS = require('ali-oss');
const { write, createFile, exists, resolve } = require('./helper');
let client;
const LOCAL_INFO = './oss-temp.json';
const createClient = options => {
  if (exists(LOCAL_INFO) && !options) {
    options = require(LOCAL_INFO);
  }
  const {
    accessKeyId,
    accessKeySecret,
    bucket,
    region,
    timeout = 60000 * 3,
  } = options;
  client = new OSS({
    accessKeyId,
    accessKeySecret,
    bucket,
    region,
    timeout,
  });
  if (options) write(LOCAL_INFO, JSON.stringify(options));
};

const upload = async (localPath, ossPath) => {
  if (!client) throw new Error('OSS not initialized');
  console.log('start uploading ', localPath);
  const start = Date.now();
  await client.put(ossPath, localPath);
  console.log('upload done ', (Date.now() - start) / 1000, localPath);
};

module.exports = {
  createClient,
  upload,
  client,
};
