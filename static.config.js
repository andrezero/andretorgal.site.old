import { configure } from './.react-static/config.js';
import { watch } from './.react-static/watch.js';

import { routeBuilder } from './src/routes';

const stage = process.env.BUILD_STAGE || 'dev';

const config = configure({
  stage,
  getRoutes: routeBuilder().getRoutes
});

if (stage === 'dev') {
  watch({ stage });
}

export default config;
