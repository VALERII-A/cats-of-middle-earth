export class Card {
  constructor(
    dataCat,
    selectorTemplate,
    handleCatTitle,
    handleCatImage,
    handleLikeCard
  ) {
    this._data = dataCat;
    this._handleCatTitle = handleCatTitle;
    this._handleCatImage = handleCatImage;
    this._selectorTemplate = selectorTemplate;
    this._handleLikeCard = handleLikeCard;
  }

  _getTempate() {
    //возвращает содержимое шаблона в видел DOM узла
    return document
      .querySelector(this._selectorTemplate)
      .content.querySelector('.card');
  }

  _updateViewLike() {
    if (this._data.favourite) {
      this.cardLike.classList.add('card__like_active');
    } else {
      this.cardLike.classList.remove('card__like_active');
    }
  }

  _setLikeCat = () => {
    this._data.favourite = !this._data.favourite;
    this._handleLikeCard(this._data, this);
  };

  getElement() {
    this.element = this._getTempate().cloneNode(true); //клонируем полученное содержимое из шаблона
    this.cardTitle = this.element.querySelector('.card__name');
    this.cardImage = this.element.querySelector('.card__image');
    this.cardLike = this.element.querySelector('.card__like');

    this.updateView();

    this.setEventListener();
    return this.element;
  }

  getData() {
    return this._data;
  }

  getId() {
    return this._data.id;
  }

  setData(newData) {
    this._data = newData;
  }

  updateView() {
    this.cardTitle.textContent = this._data.name;
    this.cardImage.src = this._data.image;

    this._updateViewLike();
  }

  deleteView() {
    this.element.remove();
    this.element = null;
  }

  setEventListener() {
    this.cardTitle.addEventListener('click', () => this._handleCatTitle(this));
    this.cardImage.addEventListener('click', () =>
      this._handleCatImage(this._data)
    );
    this.cardLike.addEventListener('click', this._setLikeCat);
  }
}
