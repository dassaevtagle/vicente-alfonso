/* const config = {
  locales: [
    // 'ar',
    // 'fr',
    // 'cs',
    // 'de',
    // 'dk',
    // 'es',
    // 'he',
    // 'id',
    // 'it',
    // 'ja',
    // 'ko',
    // 'ms',
    // 'nl',
    // 'no',
    // 'pl',
    // 'pt-BR',
    // 'pt',
    // 'ru',
    // 'sk',
    // 'sv',
    // 'th',
    // 'tr',
    // 'uk',
    // 'vi',
    // 'zh-Hans',
    // 'zh',
  ],
};

const bootstrap = (app) => {
  console.log(app);
};

export default {
  config,
  bootstrap,
};
 */

import favicon from './extensions/favicon.ico';
import faviconLg from './extensions/favicon-5.png';

export default {
  config: {
    locales: [
      'es',
    ],

    head: {
      favicon: favicon,
    },

    auth: {
      logo: faviconLg
    }
  },
  bootstrap() { }
}