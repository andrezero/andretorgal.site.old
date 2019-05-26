import { configure } from './.react-static/config.js';
import { watch } from './.react-static/watch.js';

const stage = process.env.BUILD_STAGE || 'dev';

const reactStaticConfig = configure({
  stage
});

if (stage === 'dev') {
  watch({ stage });
}

export default reactStaticConfig;
