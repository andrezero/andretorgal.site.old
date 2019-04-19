import * as React from 'react';
import { useRouteData } from 'react-static';

export default () => {
  const data = (useRouteData as any)();
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Welcome to React-Static</h1>
      <p>title: {data.title}</p>
      <p>content: {data.content}</p>
      <p>path: {data.path}</p>
      <p>relPath: {data.relPath}</p>
      <p>template: {data.template}</p>
    </div>
  );
};
