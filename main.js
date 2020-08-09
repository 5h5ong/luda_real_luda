// const { getHtmlFromSelector, getHtmlFromUrl } = require('./crawling');
import cheerio from 'cheerio';
import {
  getHtmlFromSelector,
  getHtmlFromUrl,
  getImgTag,
  getImgSrc,
  downloadManyPage,
} from './crawling.js';
import { downloadMultipleImage } from './download.js';

// 직찍 페이지 url
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
      // 첫번째 a tag만 가져와 텍스트와 링크를 가져옴
      // 두번째 a tag는 댓글 수를 담고 있어서 필요없음
      const a = $(ele).find('a');
      const name = $(a[0]).text();
      const url = $(a[0]).attr('href');
      return { name, url };
    })
    .get();

  // 가져온 갤러리 url에 접근해 이미지 url만 가져옴
  const imageObject = await downloadManyPage(galleryInfo);

  // download images
  await downloadMultipleImage(imageObject);
})();
