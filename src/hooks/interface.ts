import { IRaw } from "../admin/interface";
export interface IModal {
  //Модальное окно
  open: boolean;
  setOpen: Function;
}

export interface IBasketItem {
  //корзина товаров
  _id: string;
  title: {
    RU: string;
    KZ: string;
    EN: string;
  };
  img: string;
  prise: number;
  que: number;
}

export interface IProduct {
  //Товары
  _id: string;
  category: ICategory;
  attribute: IAttribute[];
  image: string[]; //Картинки
  title: IRaw; // Название товара
  prise: number; // Цена товара
  inStock: boolean; // В наличий
  hit: boolean;
  discont: number; // Скидка
  description: IRaw; // Описание
}
export interface IAttribute {
  //Атрибуты
  _id: string;
  value: any;
}
export interface ICategory {
  //Категорий
  _id: string;
  meaning: IRaw;
  name: string;
  attribute: string[];
}

export interface IPoromocode {
  _id: string; //id
  promocode: string; //Промокод
  discont: number; // скидка
  partner: string; //Портнер
  partnerUrl: string; //Ссылка на партнера
}
export interface IOrder {
  _id: string;
  nomer: number;
  // Фиое
  firstName: string;
  lastName: string;
  // Почта
  email: string;
  // Телефон
  phone: string;
  // Страна
  country: string;
  // Город или населенный пункт
  city: string;
  // Почтовый индекс
  postIndex: string;
  // Улица
  street: string;
  // Дом
  homeIndex: string;
  // Комментарий
  comment: string;
  // Корзина
  basket: IBasketItem[];
  // Id пользователя
  userId: string;
  // Общая сумма заказа
  sum: number;
  // Промокод
  promocode: string;
  // Скидка
  discont: number;
  // Итог
  result: number;
  // Статус
  status: string;
  // Дата
  date: Date;
  // Трекер
  trackId: string;
}
export interface IUser {
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
