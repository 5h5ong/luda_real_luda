// const { getHtmlFromSelector, getHtmlFromUrl } = require('./crawling');
import {
  getHtmlFromSelector,
  getHtmlFromUrl,
  getImgTag,
  getImgSrc,
} from './crawling.js';

(async () => {
  const data = await getHtmlFromUrl(
    'https://gall.dcinside.com/mgallery/board/view/?id=luda&no=46435&_rk=EYz&search_head=10&page=1'
  );
  const parse = getHtmlFromSelector(data)(
    '#container > section > article:nth-child(3) > div.view_content_wrap > div > div.inner.clear > div.writing_view_box > div:nth-child(3) > div'
  );
  const imgTag = getImgTag(parse);
  const imgSrc = getImgSrc(imgTag);
  console.log(imgSrc);
})();
