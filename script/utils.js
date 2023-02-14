import { MAX_RATE_CAT } from "./constants.js";

export function setDataRefresh(minutes, key) {
  const setTime = new Date(new Date().getTime() + minutes * 60000);
  localStorage.setItem(key, setTime);
  return setTime;
}

export function serializeForm(elements) {
  const formData = {};

  elements.forEach((input) => {
    if (input.type === "submit") return;

    if (input.type !== "checkbox") {
      formData[input.name] = input.value;
    }

    if (input.type === "checkbox") {
      formData[input.name] = input.checked;
    }
  });

  return formData;
}

export const printNumerals = (number, titles) => {
  number = Math.abs(number);
  if (Number.isInteger(number)) {
    const cases = [2, 0, 1, 1, 1, 2];
    const text =
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ];
    return `${text}`;
  }
  return `${titles[1]}`;
};


export function generateRating(rate) {
  const rateElements = [];
  for (let index = 0; index < MAX_RATE_CAT; index++) {
    if(index < rate && rate % 1 === 0) {
      rateElements.push('<i class="fa-solid fa-star"></i>');
    } else if(index < Math.floor(rate) && rate % 1 !== 0) {
      rateElements.push('<i class="fa-solid fa-star"></i>');
    } else if(index === Math.floor(rate) && rate % 1 !== 0) {
      rateElements.push('<i class="fa-solid fa-star-half-stroke"></i>');
    } else {
      rateElements.push('<i class="fa-regular fa-star"></i> ');
    }
  }

  return rateElements.join("");

}