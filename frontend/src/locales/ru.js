const ruLocal = {
  translation: {
    loginForm: {
      title: 'Войти',
      login: 'Ваш никнейм',
      password: 'Пароль',
      send: 'Отправить',
      incorrect: 'Неверные имя пользователя или пароль',
    },
    registerForm: {
      title: 'Регистрация',
      login: 'Имя пользователя',
      password: 'Пароль',
      confrimPassword: 'Подтвердите пароль',
      send: 'Зарегистрироваться',
      incorrect: 'Неверные имя пользователя или пароль',
    },
    channels: {
      title: 'Каналы',
      manageChannel: 'Управление каналом',
      deleteChannel: 'Удалить',
      renameChannel: 'Переименовать',
    },
    messages: {
      newMessage: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      send: 'Отправить',
      message_one: '{{count}} сообщение',
      message_few: '{{count}} сообщения',
      message_many: '{{count}} сообщений',
    },
    modals: {
      name: 'Имя канала',
      add: 'Добавить канал',
      delete: 'Удалить канал',
      rename: 'Переименовать канал',
      deleteConfrim: 'Уверены?',
      buttonCancel: 'Отменить',
      buttonSend: 'Отправить',
      buttonClose: 'Закрыть',
      buttonDelete: 'Удалить',
    },
    navbar: {
      title: 'Hexlet Chat',
      logout: 'Выйти',
    },
    pageNotFound: {
      title: 'Страница не найдена',
      variant: 'Но вы можете перейти ',
      mainPage: 'на главную страницу',
    },
    notify: {
      addChannel: 'Канал создан',
      deleteChannel: 'Канал удален',
      renameChannel: 'Канал переименован',
      login: 'Успешный вход!',
      registration: 'Успешная регистрация!',
      networkError: 'Ошибка сети',
    },
    errors: {
      required: 'Обязательное поле',
      login: 'Неверные имя пользователя или пароль',
      range: 'От 3 до 20 символов',
      rangePassword: 'Не менее 6 символов',
      matchPassword: 'Пароли должны совпадать',
      userExist: 'Такой пользователь уже существует',
      uniqueChannel: 'Должно быть уникальным',
    },
  },
};

export default ruLocal;
