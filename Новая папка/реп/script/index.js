import { api } from './api.js';
import { Card } from './card.js';
import { CardExample } from './cardExample.js';
import { CatsInfo } from './cats-info.js';
import { cats } from './cats.js';
import { MAX_LIVE_STORAGE } from './contants.js';
import { PopupImage } from './popup-image.js';
import { Popup } from './popup.js';
import { serializeForm, setDataRefresh } from './utils.js';
import { xhr } from './xhrExample.js';

const cardsContainer = document.querySelector('.cards');
const cardsContainerUsers = document.querySelector('.cards-users');
const cardsContainerRM = document.querySelector('.cards-morty');

const btnOpenPopupForm = document.querySelector('#add');
const btnOpenPopupLogin = document.querySelector('#login');
const formCatAdd = document.querySelector('#popup-form-cat');
const formLogin = document.querySelector('#popup-form-login');

const popupAddCat = new Popup('popup-add-cats');
popupAddCat.setEventListener();

const popupLogin = new Popup('popup-login');
popupLogin.setEventListener();

const popupCatInfo = new Popup('popup-cat-info');
popupCatInfo.setEventListener();

const popupImage = new PopupImage('popup-image');
popupImage.setEventListener();

const catsInfoInstance = new CatsInfo(
  '#cats-info-template',
  handleEditCatInfo,
  handleLike,
  handleCatDelete
);
const catsInfoElement = catsInfoInstance.getElement();

function createCat(dataCat) {
  const cardInstance = new Card(
    dataCat,
    '#card-template',
    handleCatTitle,
    handleCatImage,
    handleLike
  );
  const newCardElement = cardInstance.getElement();
  cardsContainer.append(newCardElement);
}
function createDiv(dataDiv) {
  // CardExample
  const cardInstance = new CardExample(dataDiv, '#example-template');
  const newCardElement = cardInstance.getElement();
  cardsContainerUsers.append(newCardElement);
}

function handleFormAddCat(e) {
  e.preventDefault();
  const elementsFormCat = [...formCatAdd.elements];
  const dataFromForm = serializeForm(elementsFormCat);

  console.log(dataFromForm);
  //собрать данные из формы
  //создать карточку из данных
  //добавить карточку на страницу
  api.addNewCat(dataFromForm).then(() => {
    createCat(dataFromForm);
    updateLocalStorage(dataFromForm, { type: 'ADD_CAT' });
    popupAddCat.close();
  });
}

function handleFormLogin(e) {
  e.preventDefault();
  const elementsFormCat = [...formLogin.elements];
  const dataFromForm = serializeForm(elementsFormCat);
  console.log(dataFromForm);
  Cookies.set('email', `email=${dataFromForm.email}`);
  btnOpenPopupForm.classList.remove('visually-hidden');
  popupLogin.close();
}

function checkLocalStorage() {
  const localData = JSON.parse(localStorage.getItem('cats'));
  const getTimeExpires = localStorage.getItem('catsRefresh');

  if (localData && localData.length && new Date() < new Date(getTimeExpires)) {
    localData.forEach(function (catData) {
      createCat(catData);
    });
  } else {
    // updateLocalStorage(cats, { type: 'ALL_CATS' });

    api.getAllCats().then((data) => {
      console.log(data);
      data.forEach(function (catData) {
        createCat(catData);
      });

      updateLocalStorage(data, { type: 'ALL_CATS' });
    });
  }
}

function updateLocalStorage(data, action) {
  // {type: 'ADD_CAT'} {type: 'ALL_CATS'}
  const oldStorage = JSON.parse(localStorage.getItem('cats'));

  switch (action.type) {
    case 'ADD_CAT':
      oldStorage.push(data);
      localStorage.setItem('cats', JSON.stringify(oldStorage));
      return;
    case 'ALL_CATS':
      localStorage.setItem('cats', JSON.stringify(data));
      setDataRefresh(MAX_LIVE_STORAGE, 'catsRefresh');
      return;
    case 'DELETE_CAT':
      const newStorage = oldStorage.filter((cat) => cat.id !== data.id);
      localStorage.setItem('cats', JSON.stringify(newStorage));
      return;
    case 'EDIT_CAT':
      const updateStorage = oldStorage.map((cat) =>
        cat.id === data.id ? data : cat
      );
      localStorage.setItem('cats', JSON.stringify(updateStorage));
      return;
    default:
      break;
  }
}

function handleCatTitle(cardInstance) {
  console.log({ cardInstance });
  catsInfoInstance.setData(cardInstance);
  popupCatInfo.setContent(catsInfoElement);
  popupCatInfo.open();
}

function handleCatImage(dataCard) {
  popupImage.open(dataCard);
}

function handleLike(data, cardInstance) {
  const { id, favourite } = data;
  api.updateCatById(id, { favourite }).then(() => {
    if (cardInstance) {
      cardInstance.setData(data);
      cardInstance.updateView();
    }
    updateLocalStorage(data, { type: 'EDIT_CAT' });
    console.log('лайк изменен');
  });
}

function handleCatDelete(cardInstance) {
  api.deleteCatById(cardInstance.getId()).then(() => {
    cardInstance.deleteView();

    updateLocalStorage(cardInstance.getData(), { type: 'DELETE_CAT' });
    popupCatInfo.close();
  });
}

function handleEditCatInfo(cardInstance, data) {
  console.log('edited');
  const { age, description, name, id } = data;

  api.updateCatById(id, { age, description, name }).then(() => {
    cardInstance.setData(data);
    cardInstance.updateView();

    updateLocalStorage(data, { type: 'EDIT_CAT' });
    popupCatInfo.close();
  });
}

btnOpenPopupForm.addEventListener('click', () => popupAddCat.open());
btnOpenPopupLogin.addEventListener('click', () => popupLogin.open());
formCatAdd.addEventListener('submit', handleFormAddCat);
formLogin.addEventListener('submit', handleFormLogin);

const isAuth = Cookies.get('email');

if (!isAuth) {
  popupLogin.open();
  btnOpenPopupForm.classList.add('visually-hidden');
}

checkLocalStorage();

// async function showData(params) {
//   let dataArr = [];

//   const res = await fetch('https://jsonplaceholder.typicode.com/users/');
//   dataArr = await res.json();
//   console.log(dataArr);
//   // return dataArr;
//   dataArr.forEach(function (item) {
//     createDiv(item);
//   });
// }
// showData();
// console.log({ xhr });

// const getUsers = () => {
//   return new Promise((resolve, reject) => {
//     const res = fetch('https://jsonplaceholder.typicode.com/users/');
//     resolve(res);
//   });
// };

// getUsers()
//   .then((data) => data.json())
//   .then((json) => console.log({ json }));

// const myRes = async () => {
//   let data = await (await getUsers()).json();
//   console.log('this is await data', data);
//   return data;
// };
// myRes();

const rick_morty_url = 'https://rickandmortyapi.com/api';

const getCharacters = (page = 1, path = 'character') => {
  return new Promise((resolve, reject) => {
    const res = fetch(`${rick_morty_url}/${path}?page=${page}`);
    resolve(res);
  });
};

// getCharacters()
//   .then((data) => data.json())
//   .then((res) => console.log(res));
// // console.log(getCharacters());
// getCharacters(2)
//   .then((data) => data.json())
//   .then((res) => console.log(res));
function createRM(dataDiv) {
  // CardExample
  // console.log(dataDiv);
  const cardInstance = new CardExample(dataDiv, '#rm-template');
  const newCardElement = cardInstance.getElement();
  cardsContainerUsers.append(newCardElement);
}

const rickAndMortyInfo = async () => {
  let data = await getCharacters(1, 'character');
  let data2 = await data.json();
  data2.results.forEach((el) => {
    createRM(el);
  });
};

// getCharacters()
//   .then((data) => data.json())
//   .then((arr) => {
//     arr.results.forEach((el) => {
//       createRM(el);
//     });
//   });

// rickAndMortyInfo();

// console.log({ xhr });
