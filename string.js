const attechUrl = (urlA, urlB) => {
  return urlA + urlB;
};

export const attechDcUrl = (url) => {
  return attechUrl('https://gall.dcinside.com/', url);
};
