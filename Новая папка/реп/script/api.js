// <name> - уникальное имя (строчные латинские буквы).
// Роутеры:
// GET https://cats.petiteweb.dev/api/single/:user/show - отобразить всех котиков
// GET https://cats.petiteweb.dev/api/single/:user/show/:id- отобразить все возможные айди котиков
// GET https://cats.petiteweb.dev/api/single/:user/ids - отобразить конкретного котика
// POST https://cats.petiteweb.dev/api/single/:user/add - добавить котика
// PUT https://cats.petiteweb.dev/api/single/:user/update/:id - изменить информацию о котике
// DELETE https://cats.petiteweb.dev/api/single/:user/delete/:id - удалить котика из базы данных

const CONFIG_API = {
  url: 'https://cats.petiteweb.dev/api/single/cotobaza',
  headers: {
    'Content-type': 'application/json',
  },
};

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _onResponce(res) {
    return res.ok
      ? res.json()
      : Promise.reject({ ...res, message: 'Ошибка на стороне сервера' });
  }

  getAllCats() {
    return fetch(`${this._url}/show`, {
      method: 'GET',
    }).then(this._onResponce);
  }

  addNewCat(data) {
    return fetch(`${this._url}/add`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this._onResponce);
  }

  updateCatById(idCat, data) {
    return fetch(`${this._url}/update/${idCat}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: this._headers,
    }).then(this._onResponce);
  }

  getCatById(idCat) {
    return fetch(`${this._url}/show/${idCat}`, {
      method: 'GET',
    }).then(this._onResponce);
  }

  deleteCatById(idCat) {
    return fetch(`${this._url}/delete/${idCat}`, {
      method: 'DELETE',
    }).then(this._onResponce);
  }
}

export const api = new Api(CONFIG_API);
