import chokidar from 'chokidar';
import { rebuildRoutes } from 'react-static/node';

const watch = options => {
  const { stage } = options;

  const watcher = chokidar.watch('content', {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    awaitWriteFinish: { stabilityThreshold: 100 }
  });
  watcher.on('all', rebuildRoutes);

  const watcher = chokidar.watch(['src/routes', 'src/process'], {
    persistent: true,
    ignoreInitial: true,
    usePolling: true,
    awaitWriteFinish: { stabilityThreshold: 1000 }
  });
  watcher.on('all', rebuildRoutes);
};

export default watch;
