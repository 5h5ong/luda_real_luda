// const { getHtmlFromSelector, getHtmlFromUrl } = require('./crawling');
import cheerio from 'cheerio';
import {
  getHtmlFromSelector,
  getHtmlFromUrl,
  getImgTag,
  getImgSrc,
  downloadManyPage,
} from './crawling.js';
import { downloadImage } from './download.js';

const mainUrl =
  'https://gall.dcinside.com/mgallery/board/lists/?id=luda&sort_type=N&search_head=10&page=1';

(async () => {
  // 메인 갤러리 불러오기
  const galleryData = await getHtmlFromUrl(mainUrl);

  const $ = cheerio.load(galleryData);

  // 공지사항을 제외한 나머지 갤러리들의 url 가져옴
  const galleryInfo = $(
    '#container > section.left_content > article:nth-child(3) > div.gall_listwrap.list > table > tbody > tr[data-type][data-type!=icon_notice] > .gall_tit'
  )
    .map((i, ele) => {
      const a = $(ele).find('a');
      const name = $(a[0]).text();
      const url = $(a[0]).attr('href');
      return { name, url };
    })
    .get();

  console.log(galleryInfo);

  await downloadManyPage(galleryInfo);
})();
