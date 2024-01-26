export const genRandomId = () =>
  Math.random().toString().substring(2, 8) +
  Date.now().toString().substring(9); // 10 цифр

export const genRandomId36 = () =>
  Math.random().toString(36).substring(2, 8); // 6 знаков

export const assignId = (obj) => ({...obj, id: genRandomId()});
