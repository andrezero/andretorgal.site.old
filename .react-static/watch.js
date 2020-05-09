import chokidar from 'chokidar';
import { rebuildRoutes } from 'react-static/node';

export const watch = () => {
  // export const watch = options => {
  // const { stage } = options;

  const defaultOptions = {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    awaitWriteFinish: { stabilityThreshold: 100 }
  };

  const watchers = [];

  const contentOptions = { ...defaultOptions };
  watchers.push(chokidar.watch(['content', 'meta', 'node_modules/@andrezero-xp'], contentOptions));

  // @todo react-static does not reload ./static.config.js file
  // const routesOptions = { ...defaultOptions, awaitWriteFinish: { stabilityThreshold: 1000 } };
  // watchers.push(chokidar.watch(['src/**/*.(routes|source).ts'], routesOptions));

  watchers.forEach(watcher => watcher.on('all', rebuildRoutes));
};
