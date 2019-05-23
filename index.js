#!/usr/bin/env node
const program = require('commander');
const labelFolder = require('./labelFolder');
const normalize = require('./normalize');
const { createClient, upload, client } = require('./oss');
const { exists, resolve } = require('./helper');
program.version('0.5.0').description('Normalize data and label data');
program
  .command('label [folder]')
  .alias('l')
  .description('label a foler with tags provided')
  .option('-i, --input [input]', 'input expect a foler')
  .option('-n, --normal', 'if normalize data, before label it')
  .option('-o, --output [output]', 'output file extension default is csv')
  .option('-t, --tag <tags>', 'tags you want to add')
  .action((folder, cmd) => {
    const { output, tag, input, normal } = cmd;
    if (normal) normalize(folder || input);
    labelFolder(folder || input, tag, output);
  });

program
  .command('normalize [folder]')
  .alias('n')
  .description('rename files in the folder to a standard way')
  .action((folder, cmd) => {
    const { input } = cmd;
    normalize(folder || input);
  });
program
  .command('upload')
  .alias('up')
  .description('upload a file to aliyun oss')
  .option('-l, --login [login]', 'log in to aliyun oss')
  .option('-f, --filename <filename>', 'path of the file you want to upload')
  .option('-d, --dest [dest]', 'dest folder')
  .action(async cmd => {
    const { login, filename, dest } = cmd;
    let jjson;
    if (login) jjson = require(resolve(login));
    createClient(jjson);
    const localFile = filename;
    const destPath = dest ? dest + '/' + filename : filename;
    await upload(localFile, destPath);
  });
program.command('test').action(() => {
  createClient();
  console.log(client);
});
program.command('*').action(() => {
  console.log('You may want to use --help to see how to use it');
});
program.parse(process.argv);
