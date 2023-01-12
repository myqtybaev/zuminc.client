interface ILang {
  [key: string]: ILangItem;
}
interface ILangItem {
  header: {
    week: string;
    auth: {
      title: string;
      email: string;
      code: string;
      sendMessage: string;
      helpSend: string;
      submit: string;
      cancel: string;
    };
  };
  basket: {
    title: string;
    allSum: string;
    submit: string;
  };
  home: {
    catalogButton: {
      news: string;
      hit: string;
      discont: string;
    };
  };
  order: {
    //Форма
    title: string;
    personTitle: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    addressTitle: string;
    country: string;
    city: string;
    postIndex: string;
    street: string;
    homeIndex: string;
    comment: string;
    //Промокод
    promocodeTitle: string;
    summOrder: string;
    delivery: string;
    promocode: string;
    promocodeSubmit: string;
    discont: string;
    itog: string;
    //
    submit: string;
  };
  user: {
    menu: {
      profile: string;
      orders: string;
      support: string;
      exit: string;
    };
    profile: {
      personTitle: string;
      email: string;
      firstName: string;
      lastName: string;
      gender: string;
      birdDay: string;
      addressTitle: string;
      country: string;
      city: string;
      postIndex: string;
      street: string;
      homeIndex: string;
      submit: string;
    };
  };
  admin: {
    layout: {
      user: string;
      promocode: string;
      order: string;
      productSub: string;
      attribute: string;
      category: string;
      product: string;

      home: string;
      profile: string;
    };
    user: {
      email: string;
      password: string;
      role: string;
      createTitle: string;
      editTitle: string;
      destroyTitle: string;
      createSubmit: string;
      editSubmit: string;
    };
    promocode: {};
    order: {};
  };
  util: {};
}
export const langFile: ILang = {
  RU: {
    header: {
      week: "Пон-Пят",
      auth: {
        title: "Авторизация/Регистрация",
        email: "Ваша почта",
        code: "Код",
        sendMessage: "Получить код",
        helpSend: "Отпрвить код еще раз",
        submit: "Войти",
        cancel: "Отмена",
      },
    },
    basket: {
      title: "Вернутся в покупкам",
      allSum: "СТОИМОСТЬ ТОВАРОВ",
      submit: "Оформить заказ",
    },
    home: {
      catalogButton: {
        news: "Новинки",
        hit: "Популярное",
        discont: "Скидки",
      },
    },
    order: {
      title: "Оформление заказа",
      personTitle: "Контактное лицо",
      firstName: "Ваше Имя",
      lastName: "Вашу Фамилию",
      email: "Ваша почта",
      phone: "Вашь телефон",
      addressTitle: "Адресс",
      country: "Страна",
      city: "Город или населенный пункт",
      postIndex: "Почтовый индекс",
      street: "Улица",
      homeIndex: "Дом",
      comment: "Комментарий",
      promocodeTitle: "Сумма заказа",
      summOrder: "Общая сумма",
      delivery: "Доставка",
      promocode: "Промокод",
      promocodeSubmit: "Активировать",
      discont: "Скидка",
      itog: "Итог",
      //
      submit: "Оформить заказ",
    },
    user: {
      menu: {
        profile: "Мой профиль",
        orders: "Аудит заказов",
        support: "",
        exit: "Выход",
      },
      profile: {
        personTitle: "Ваш профиль",
        email: "Ваша почта",
        firstName: "Ваше имя",
        lastName: "Ваша фамилия",
        gender: "Ваша пол",
        birdDay: "Ваша дата рождения",
        addressTitle: "Адрессная книга",
        country: "Страна",
        city: "Ваш город",
        postIndex: "Почтовый индекс",
        street: "Улица",
        homeIndex: "Дом",
        submit: "Сахранить",
      },
    },
    admin: {
      layout: {
        user: "Пользователи",
        promocode: "Промокод",
        order: "Заказы",
        productSub: "Товары",
        attribute: "Атрибуты",
        category: "Категорий",
        product: "Товары",

        home: "Главное",
        profile: "Личный кабинет",
      },
      user: {
        email: "Почта",
        password: "Пороль",
        role: "Роль",
        createTitle: "Создать пользователя",
        editTitle: "Редактировать",
        destroyTitle: "Удалить",
        createSubmit: "Создать пользователя",
        editSubmit: "Изменить пользователя",
      },
      promocode: {},
      order: {},
    },
    util: {},
  },
  KZ: {
    header: {
      week: "Дүйсенбі-жұма",
      auth: {
        title: "Авторландыру/Тіркелу",
        email: "E-mail",
        code: "Код",
        sendMessage: "Кодты алу",
        helpSend: "Кодты қайтадан жіберу",
        submit: "Кіру",
        cancel: "Жою",
      },
    },
    basket: {
      title: "Сатылымға қайтару",
      allSum: "Тауар бағасы",
      submit: "Тапсырысты рәсімдеу",
    },
    home: {
      catalogButton: {
        news: "Жаңа тауарлар",
        hit: "Танымал тауарлар",
        discont: "Жеңілдіктер",
      },
    },
    order: {
      title: "Тапсырысты рәсімдеу",
      personTitle: "Байланыс үшін (для связи)",
      firstName: "Аты-Жөні",
      lastName: "Вашу Фамилию",
      email: "E-mail",
      phone: "Сіздің нөмеріңіз",
      addressTitle: "Мекен-жайы",
      country: "Мекен (страна)",
      city: "Қалаңыз немесе ауданыңыз",
      postIndex: "Пошта индексі",
      street: "Көше",
      homeIndex: "Үй",
      comment: "Пікір",
      promocodeTitle: "Тапсырыстың бағасы",
      summOrder: "Жалпы бағасы",
      delivery: "Жеткізу",
      promocode: "Промокод",
      promocodeSubmit: "Іске қосу",
      discont: "Жеңілдіктер",
      itog: "Қорытынды",
      //
      submit: "Тапсырысты рәсімдеу",
    },
    user: {
      menu: {
        profile: "Менің парақшам",
        orders: "Аудит тапсырысты",
        support: "",
        exit: "Шығу",
      },
      profile: {
        personTitle: "Сіздің парақшаңыз",
        email: "E-mail",
        firstName: "Аты-Жөніңіз",
        lastName: "Сіздің жынысыңыз (ваш пол)",
        gender: "Сіздің туған күніңіз",
        birdDay: "Мекен-жай кітабыңыз",
        addressTitle: "Мекен-жай кітабыңыз",
        country: "Мекен (страна)",
        city: "Сіздің қалаңыз",
        postIndex: "Пошта индексі",
        street: "Көше",
        homeIndex: "Үй",
        submit: "Сақтау",
      },
    },
    admin: {
      layout: {
        user: "Пользователи",
        promocode: "Промокод",
        order: "Заказы",
        productSub: "Товары",
        attribute: "Атрибуты",
        category: "Категорий",
        product: "Товары",

        home: "Главное",
        profile: "Личный кабинет",
      },
      user: {
        email: "Почта",
        password: "Пороль",
        role: "Роль",
        createTitle: "Создать пользователя",
        editTitle: "Редактировать",
        destroyTitle: "Удалить",
        createSubmit: "Создать пользователя",
        editSubmit: "Изменить пользователя",
      },
      promocode: {},
      order: {},
    },
    util: {},
  },
  EN: {
    header: {
      week: "Monday-Friday",
      auth: {
        title: "Log in/sign up",
        email: "E-mail",
        code: "Password",
        sendMessage: "Receive code",
        helpSend: "Send code again",
        submit: "Sign in",
        cancel: "Cancel",
      },
    },
    basket: {
      title: "Back to shopping",
      allSum: "Price of the goods",
      submit: "To make an order",
    },
    home: {
      catalogButton: {
        news: "New (latest)",
        hit: "Popular",
        discont: "Sale",
      },
    },
    order: {
      title: "Check out (to make an order)",
      personTitle: "Contact person",
      firstName: "Your name",
      lastName: "Your Surname",
      email: "Your e-mail",
      phone: "Your phone",
      addressTitle: "Address",
      country: "Country",
      city: "City or settlement",
      postIndex: "Postcode",
      street: "Street",
      homeIndex: "House",
      comment: "Comment",
      promocodeTitle: "Order amount",
      summOrder: "Total amount",
      delivery: "Delivery",
      promocode: "Promo code",
      promocodeSubmit: "Activate",
      discont: "Sale",
      itog: "Total",
      //
      submit: "Check out (to make an order)",
    },
    user: {
      menu: {
        profile: "My profile",
        orders: "Audit of the orders",
        support: "",
        exit: "Log out",
      },
      profile: {
        personTitle: "Your profile",
        email: "Your e-mai",
        firstName: "Your name",
        lastName: "Your surname",
        gender: "Your gender",
        birdDay: "Your date of birth",
        addressTitle: "Address book",
        country: "Country",
        city: "Your city",
        postIndex: "Index",
        street: "Street",
        homeIndex: "House",
        submit: "Save",
      },
    },
    admin: {
      layout: {
        user: "Пользователи",
        promocode: "Промокод",
        order: "",
        productSub: "string",
        attribute: "string",
        category: "string",
        product: "string",

        home: "string",
        profile: "string",
      },
      user: {
        email: "Почта",
        password: "Пороль",
        role: "Роль",
        createTitle: "Создать пользователя",
        editTitle: "Редактировать",
        destroyTitle: "Удалить",
        createSubmit: "Создать пользователя",
        editSubmit: "Изменить пользователя",
      },
      promocode: {},
      order: {},
    },
    util: {},
  },
};
