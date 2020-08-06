// const axios = require('axios');
// const cheerio = require('cheerio');
import axios from 'axios';
import cheerio from 'cheerio';
import { attechDcUrl } from './string.js';

export const getHtmlFromUrl = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getHtmlFromSelector = (html) => (selector) => {
  const $ = cheerio.load(html);
  const result = $(selector).html();
  return result;
};
export const getObjectFromSelector = (html, selector) => {
  const $ = cheerio.load(html);
  const result = $(selector);
  return result;
};

export const getImgTag = (html) => {
  const $ = cheerio.load(html);
  const src = $('img').toArray();
  return src;
};
export const getImgSrc = (cheerObject) => {
  return cheerObject.map((object) => object.attribs.src);
};

export const findElementFromCheerio = (cheerObject, selector) => {
  const result = cheerObject.find(selector);
  return result;
};

export const galleryImageParse = (data) => {
  const parse = getHtmlFromSelector(data)(
    '#container > section > article:nth-child(3) > div.view_content_wrap > div > div.inner.clear > div.writing_view_box > div:nth-child(3) > div'
  );
  const imgTag = getImgTag(parse);
  const imgSrc = getImgSrc(imgTag);

  return imgSrc;
};

// url object({name , url})을 사용해 많은 페이지에서 이미지 url 가져옴
export const downloadManyPage = async (urlObject) => {
  for (urlObject of urlObject) {
    const gallUrl = attechDcUrl(object.url);

    const data = await getHtmlFromUrl(gallUrl);
    const imgUrls = galleryImageParse(data);
  }
  return { name: object.name, images: imgUrls };
};
