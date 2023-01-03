const CONFIG_API = {
    url: 'https://cats.petiteweb.dev/api/single/cotobaza',
    headers: {
        'Content-type': 'application/json'
    }
}

class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }

    _onResponce(res){
        return res.ok ? res.json() : Promise.reject({...res, message: "Ошибка на стороне сервера"});
    }

    getAllCats(){
        return fetch(`${this._url}/show`, {
            method: 'GET'
        }).then(this._onResponce).catch(error => console.log(error));
    }


    addNewCat(data){
        return fetch(`${this._url}/add`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onResponce).catch(error => console.log(error));
    }

    updateCatById(idCat, data){
        fetch(`${this._url}/update/${idCat}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: this._headers
        }).then(this._onResponce).catch(error => console.log(error));
    }


    getCatById(idCat){
        fetch(`${this._url}/show/${idCat}`, {
            method: 'GET',
        }).then(this._onResponce).catch(error => console.log(error));
    }


    deleteCatById(idCat){
        fetch(`${this._url}/delete/${idCat}`, {
            method: 'DELETE',
        }).then(this._onResponce).catch(error => console.log(error));
    }
}

export const api = new Api(CONFIG_API);

// api.getAllCats()
