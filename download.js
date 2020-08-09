import fs from 'fs';
import path from 'path';
import axios from 'axios';

const downloadImage = async (url, imagePath) => {
  const writer = fs.createWriteStream(imagePath);

  const res = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  res.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', (e) => 'error!');
  });
};

// 이미지 오브젝트를 사용해 이미지 다운로드
export const downloadMultipleImage = async (imageObject) => {
  // images directory 있는지 확인
  const directoryPath = path.resolve('images');
  checkDriectoryExists(directoryPath);

  imageObect.forEach(async (imageAndUrls) => {
    const { images, name } = imageAndUrls;
    for (const [index, image] of images.entries()) {
      try {
        // Create new Image Directory
        const imageDirectoryPath = path.resolve('images', `${name}`);
        const imagePath = path.resolve(imageDirectoryPath, `${index}.jpg`);
        checkDriectoryExists(imageDirectoryPath);

        // download image
        await downloadImage(image, imagePath);
      } catch (e) {
        throw new Error(e);
      }
    }
  });
};

export const checkDriectoryExists = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
};
