const requestUrl = 'https://swapi.dev/api/films/1/';

export const xhr = new XMLHttpRequest();

console.log('xhr >>>>', xhr);

xhr.open('GET', requestUrl);

xhr.responseType = 'json';

xhr.onload = () => {
  if (xhr.status) {
    console.log('>>>>>>>>>>>>',xhr.response);
  }
};
xhr.onerror = () => {
};
xhr.send();


