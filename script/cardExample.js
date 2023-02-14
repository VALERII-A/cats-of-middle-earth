export class CardExample {
  constructor(
    dataUser,
    selectorTemplate,
    handleCatTitle,
    handleCatImage,
    handleLikeCard
  ) {
    this._data = dataUser;
    this._selectorTemplate = selectorTemplate;
  }

  _getTempate() {
    //возвращает содержимое шаблона в видел DOM узла
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector('.card');
  }

  getElement() {
    this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
    console.log('this._data>>>', this._data);
    this.cardTitle = this.element.querySelector('.card__name');
    this.cardImage = this.element.querySelector('.card__image');
    const cardPhone = this.element.querySelector('.card__phone');
    const cardUsername = this.element.querySelector('.card__username');
    const cardWebsite = this.element.querySelector('.card__website');

    this.cardImage.src = this._data.image;
    this.cardTitle.textContent = this._data.name;
    cardPhone.textContent = this._data.status;
    cardUsername.textContent = this._data.url;
    cardWebsite.textContent = this._data.species;

    cardImage.src = this._data.image;
   

    return this.element;
  }
}
