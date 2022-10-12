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