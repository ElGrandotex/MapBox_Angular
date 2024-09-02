const { writeFileSync, mkdirSync } = require('fs')
require('dotenv').config();

const targetPath = './src/environmets/environment.ts'

const envFileContent = `
export const environment = {
  mapbox_key: "${process.env['MAPBOX_KEY']}",

};
`;


mkdirSync('./src/environments',  {recursive: true});
writeFileSync(targetPath, envFileContent);
