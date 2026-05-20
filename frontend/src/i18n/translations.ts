export type LangCode = 'en' | 'ru' | 'uk';
export type ThemeCode = 'dark' | 'light';

export const translations = {
  en: {
    nav: {
      groups: { formatters: 'Formatters', encoders: 'Encoders', sqlTools: 'SQL Tools', utilities: 'Utilities', system: 'System' },
      items: { json: 'JSON Formatter', sql: 'SQL Formatter', xml: 'XML Formatter', base64: 'Base64', sqlin: 'SQL IN Builder', shortener: 'URL Shortener', settings: 'Settings' },
    },
    settings: {
      title: 'Settings', subtitle: 'Manage application preferences',
      languageLabel: 'Interface Language',
      themeLabel: 'Color Theme', themeDark: 'Dark', themeLight: 'Light',
      aboutLabel: 'About', version: 'Version 1.0.0', copyright: '© Tesky 2026',
      aboutDesc: 'UniTools — an offline-first developer toolkit for everyday tasks.',
      langs: { en: 'English', ru: 'Russian', uk: 'Ukrainian' },
    },
    common: {
      formatBtn: 'Format & Validate', formatting: 'Formatting…',
      copy: 'Copy Result', copied: '✓ Copied!', clear: 'Clear',
      serverError: 'Failed to connect to the server.',
    },
    json: {
      title: 'JSON Formatter',
      description: 'Validate and pretty-print JSON objects. Instantly highlights syntax errors.',
    },
    sql: {
      title: 'SQL Formatter (MS SQL)',
      description: 'Strictly validates T-SQL / MS SQL syntax. Shows exact line and column of errors.',
    },
    xml: {
      title: 'XML Formatter',
      description: 'Validate and format XML documents. Catches mismatched tags and malformed structures.',
    },
    base64: {
      title: 'Base64 Encoder / Decoder',
      description: 'Encode plain text to Base64 or decode Base64 back to text.',
      modeEncode: 'Encode → Base64', modeDecode: 'Decode ← Base64',
      inputEncode: 'Plain Text', inputDecode: 'Base64 Input',
      outputEncode: 'Base64 Output', outputDecode: 'Decoded Text',
      phEncode: 'Enter text to encode…', phDecode: 'Enter Base64 string to decode…',
      phResult: 'Result will appear here…',
      btnEncode: '⟶ Encode', btnDecode: '⟵ Decode',
      swap: '⇄ Swap',
      errEncode: 'Failed to encode input.',
      errDecode: 'Invalid Base64 string. Check your input.',
    },
    sqlin: {
      title: 'SQL IN Builder',
      description: "Paste a list of values — one per line. The tool wraps them in single quotes for SQL IN (...). Apostrophes inside values are automatically escaped as ''.",
      inputLabel: 'Input values (one per line)',
      outputLabel: 'Result for SQL IN',
      btnConvert: '⟶ Build',
      exampleUsage: 'Example usage:',
      valueCount: (n: number) => `${n} value${n !== 1 ? 's' : ''}`,
    },
    shortener: {
      title: 'URL Shortener',
      description: 'Condense your long links into clean, shareable short URLs.',
      placeholder: 'https://example.com/very/long/path/to/something',
      btn: '🔗 Shorten URL', shortening: 'Shortening…',
      ready: '✓ Your short URL is ready!',
      error: 'Failed to connect to the server.',
      copy: 'Copy',
    },
  },

  ru: {
    nav: {
      groups: { formatters: 'Форматировщики', encoders: 'Кодировщики', sqlTools: 'SQL Инструменты', utilities: 'Утилиты', system: 'Система' },
      items: { json: 'JSON Formatter', sql: 'SQL Formatter', xml: 'XML Formatter', base64: 'Base64', sqlin: 'SQL IN Builder', shortener: 'Сокращатель URL', settings: 'Настройки' },
    },
    settings: {
      title: 'Настройки', subtitle: 'Управление параметрами приложения',
      languageLabel: 'Язык интерфейса',
      themeLabel: 'Цветовая тема', themeDark: 'Тёмная', themeLight: 'Светлая',
      aboutLabel: 'О программе', version: 'Версия 1.0.0', copyright: '© Tesky 2026',
      aboutDesc: 'UniTools — набор инструментов разработчика для повседневных задач, работающий офлайн.',
      langs: { en: 'Английский', ru: 'Русский', uk: 'Украинский' },
    },
    common: {
      formatBtn: 'Форматировать и проверить', formatting: 'Обработка…',
      copy: 'Скопировать', copied: '✓ Скопировано!', clear: 'Очистить',
      serverError: 'Не удалось подключиться к серверу.',
    },
    json: {
      title: 'JSON Форматировщик',
      description: 'Проверка и красивое форматирование JSON. Мгновенно подсвечивает синтаксические ошибки.',
    },
    sql: {
      title: 'SQL Форматировщик (MS SQL)',
      description: 'Строгая проверка синтаксиса T-SQL / MS SQL. Показывает точную строку и столбец ошибки.',
    },
    xml: {
      title: 'XML Форматировщик',
      description: 'Проверка и форматирование XML-документов. Находит несовпадающие теги и ошибки структуры.',
    },
    base64: {
      title: 'Base64 Кодировщик / Декодировщик',
      description: 'Кодирует текст в Base64 или декодирует обратно.',
      modeEncode: 'Кодировать → Base64', modeDecode: 'Декодировать ← Base64',
      inputEncode: 'Исходный текст', inputDecode: 'Base64 строка',
      outputEncode: 'Результат Base64', outputDecode: 'Декодированный текст',
      phEncode: 'Введите текст для кодирования…', phDecode: 'Введите Base64 строку для декодирования…',
      phResult: 'Результат появится здесь…',
      btnEncode: '⟶ Кодировать', btnDecode: '⟵ Декодировать',
      swap: '⇄ Поменять местами',
      errEncode: 'Ошибка при кодировании.',
      errDecode: 'Некорректная Base64 строка. Проверьте ввод.',
    },
    sqlin: {
      title: 'SQL IN Builder',
      description: "Вставьте список значений — каждое с новой строки. Инструмент оборачивает их в одиночные кавычки для SQL IN (...). Апостроф внутри значений автоматически экранируется как ''.",
      inputLabel: 'Входные данные (по одному в строке)',
      outputLabel: 'Результат для SQL IN',
      btnConvert: '⟶ Сформировать',
      exampleUsage: 'Пример использования:',
      valueCount: (n: number) => {
        if (n % 10 === 1 && n % 100 !== 11) return `${n} значение`;
        if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return `${n} значения`;
        return `${n} значений`;
      },
    },
    shortener: {
      title: 'Сокращатель URL',
      description: 'Превращает длинные ссылки в короткие и удобные для публикации.',
      placeholder: 'https://example.com/очень/длинный/путь',
      btn: '🔗 Сократить URL', shortening: 'Сокращение…',
      ready: '✓ Короткая ссылка готова!',
      error: 'Не удалось подключиться к серверу.',
      copy: 'Копировать',
    },
  },

  uk: {
    nav: {
      groups: { formatters: 'Форматувальники', encoders: 'Кодувальники', sqlTools: 'SQL Інструменти', utilities: 'Утиліти', system: 'Система' },
      items: { json: 'JSON Formatter', sql: 'SQL Formatter', xml: 'XML Formatter', base64: 'Base64', sqlin: 'SQL IN Builder', shortener: 'Скорочувач URL', settings: 'Налаштування' },
    },
    settings: {
      title: 'Налаштування', subtitle: 'Керування параметрами застосунку',
      languageLabel: 'Мова інтерфейсу',
      themeLabel: 'Кольорова тема', themeDark: 'Темна', themeLight: 'Світла',
      aboutLabel: 'Про програму', version: 'Версія 1.0.0', copyright: '© Tesky 2026',
      aboutDesc: 'UniTools — набір інструментів розробника для щоденних завдань, що працює офлайн.',
      langs: { en: 'Англійська', ru: 'Російська', uk: 'Українська' },
    },
    common: {
      formatBtn: 'Форматувати і перевірити', formatting: 'Обробка…',
      copy: 'Скопіювати', copied: '✓ Скопійовано!', clear: 'Очистити',
      serverError: 'Не вдалося підключитися до сервера.',
    },
    json: {
      title: 'JSON Форматувальник',
      description: 'Перевірка та гарне форматування JSON. Миттєво підсвічує синтаксичні помилки.',
    },
    sql: {
      title: 'SQL Форматувальник (MS SQL)',
      description: 'Сувора перевірка синтаксису T-SQL / MS SQL. Показує точний рядок і стовпець помилки.',
    },
    xml: {
      title: 'XML Форматувальник',
      description: 'Перевірка та форматування XML-документів. Знаходить теги, що не збігаються.',
    },
    base64: {
      title: 'Base64 Кодувальник / Декодувальник',
      description: 'Кодує текст у Base64 або декодує назад.',
      modeEncode: 'Кодувати → Base64', modeDecode: 'Декодувати ← Base64',
      inputEncode: 'Вихідний текст', inputDecode: 'Base64 рядок',
      outputEncode: 'Результат Base64', outputDecode: 'Декодований текст',
      phEncode: 'Введіть текст для кодування…', phDecode: 'Введіть Base64 рядок для декодування…',
      phResult: 'Результат з\'явиться тут…',
      btnEncode: '⟶ Кодувати', btnDecode: '⟵ Декодувати',
      swap: '⇄ Поміняти місцями',
      errEncode: 'Помилка при кодуванні.',
      errDecode: 'Некоректний Base64 рядок. Перевірте введення.',
    },
    sqlin: {
      title: 'SQL IN Builder',
      description: "Вставте список значень — кожне з нового рядка. Інструмент загортає їх у одинарні лапки для SQL IN (...). Апостроф у значеннях автоматично екранується як ''.",
      inputLabel: 'Вхідні дані (по одному в рядку)',
      outputLabel: 'Результат для SQL IN',
      btnConvert: '⟶ Сформувати',
      exampleUsage: 'Приклад використання:',
      valueCount: (n: number) => {
        if (n % 10 === 1 && n % 100 !== 11) return `${n} значення`;
        if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return `${n} значення`;
        return `${n} значень`;
      },
    },
    shortener: {
      title: 'Скорочувач URL',
      description: 'Перетворює довгі посилання на короткі та зручні для публікації.',
      placeholder: 'https://example.com/дуже/довгий/шлях',
      btn: '🔗 Скоротити URL', shortening: 'Скорочення…',
      ready: '✓ Коротке посилання готове!',
      error: 'Не вдалося підключитися до сервера.',
      copy: 'Копіювати',
    },
  },
} as const;

export type Translations = typeof translations.en;
