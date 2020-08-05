// const axios = require('axios');
// const cheerio = require('cheerio');
import axios from 'axios';
import cheerio from 'cheerio';

export const getHtmlFromUrl = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

export const getHtmlFromSelector = (html) => (selector) => {
  const $ = cheerio.load(html);
  const result = $(selector).html();
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

// export const getAllHtmlElements = (html, selector) => {
//   const $ = cheerio.load(html);
//   const result = $().('div');
//   return result;
// };
