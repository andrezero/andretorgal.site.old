import chokidar from 'chokidar';
import { rebuildRoutes } from 'react-static/node';

const watch = options => {
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
  watchers.push(chokidar.watch(['src/**/*.(routes|source).tsx'], routesOptions));

  watchers.forEach(watcher => watcher.on('all', rebuildRoutes));
};

export default watch;
