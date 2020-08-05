import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const downloadImage = async (url, name) => {
  const directoryPath = path.resolve('images');
  const imagePath = path.resolve(directoryPath, name);

  // 디렉토리가 존재하지 않을 때 생성
  checkDriectoryExists(directoryPath);
  const writer = fs.createWriteStream(imagePath);

  const res = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject('error!'));
  });
};

const checkDriectoryExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
