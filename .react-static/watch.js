import chokidar from 'chokidar';
import { rebuildRoutes } from 'react-static/node';

export const watch = options => {
  const { stage } = options;

  const defaultOptions = {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    awaitWriteFinish: { stabilityThreshold: 100 }
  };

  const contentOptions = { ...defaultOptions };
  const routesOptions = { ...defaultOptions, awaitWriteFinish: { stabilityThreshold: 1000 } };

  const watchers = [];
  watchers.push(chokidar.watch(['content', 'docs'], contentOptions));

  // @todo react-static does not reload ./static.config.js file
  // watchers.push(chokidar.watch(['src/**/*.(routes|source).ts'], routesOptions));

  watchers.forEach(watcher => watcher.on('all', rebuildRoutes));
};
