import * as React from 'react';

import { Link } from '../../../Shared/elements/Link/Link.component';
import { Asset } from '../../types/Asset.models';

import './AssetCaption.scss';

interface Props {
  asset: Asset;
}

const renderAuthor = (asset: Asset) => {
  const {
    author: { name, url }
  } = asset;
  return (
    <>
      By {url && <Link href={url}>{name}</Link>}
      {!url && name}
    </>
  );
};

const renderLicense = (asset: Asset) => {
  const {
    license: { name, url }
  } = asset;
  return (
    <>
      {url && <Link href={url}>{name || 'Fair use'}</Link>}
      {!url && name}
    </>
  );
};

const renderMeta = (asset: Asset) => {
  const { author, license } = asset;
  return (
    <small className="meta">
      ({author && renderAuthor(asset)}
      {author && license && ', '}
      {license && renderLicense(asset)})
    </small>
  );
};

interface Props {
  asset: Asset;
}

export const AssetCaption: React.StatelessComponent<Props> = ({ asset }) => {
  const { title, author, license } = asset;
  const hasMeta = author || license;
  return (
    <figcaption className="asset-caption">
      <p>
        {title && title}
        {hasMeta && renderMeta(asset)}
      </p>
    </figcaption>
  );
};
