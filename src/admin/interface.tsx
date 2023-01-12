export interface IAttribute {
  _id: string;
  meaning: {
    RU: string;
    KZ: string;
    EN: string;
  };
  name: string;
  type: string;
  value?: {
    RU: string;
    KZ: string;
    EN: string;
  };
}
export interface ICategory {
  _id: string;
  meaning: {
    RU: string; // Название на РУСКОМ
    KZ: string; // Название на КАЗАХСКОМ
    EN: string; // Название на АНГЛИЙСКОМ
  };
  name: string; // ярлык
  attribute: string[];
}
export interface IProduct {
  _id: string;
  image: string[]; //Картинки
  title: IRaw; // Название товара
  prise: number; // Цена товара
  category: string; // Категория товара
  attribute: IRaw[]; // Атрибуты
  inStock: boolean; // В наличий
  hit: boolean;
  discont: number; // Скидка
  description: IRaw; // Описание
}
export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: string;
  // Личные данные
  // Имя
  firstName: string;
  // Фамилия
  lastName: string;
  // Пол
  gender: string;
  // День рождения
  birdDay: string;

  // Адресс
  // Страна
  country: string;
  // Город
  city: string;
  // Почтовый индекс
  postIndex: string;
  // Улица
  street: string;
  // Дом
  homeIndex: string;
}

export interface IModal {
  state: boolean;
  setState: Function;
}

export interface ICreateAttribute {
  value_RU: string; // Название на РУСКОМ
  value_KZ: string; // Название на КАЗАХСКОМ
  value_EN: string; // Название на АНГЛИЙСКОМ
  label: string; // ярлык
  type: string; // Тип
}
export interface IRaw {
  RU: string;
  KZ: string;
  EN: string;
}
