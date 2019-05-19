import { NodeLink } from './Node.models';

export interface AssetPipelines {
  [name: string]: any;
}

export interface AssetSrc {
  href: string;
}

export type AssetFilter = (asset: Asset) => boolean;

export interface AssetLocator {
  locate(asset: Asset): void;
  url(asset: Asset, profile: string): string;
  destination(asset: Asset, profile: string): string;
}

export type AssetProcessor = (
  asset: Asset,
  pieplines: AssetPipelines,
  profile?: string,
  locator?: AssetLocator
) => Promise<AssetSrc | void>;

export interface AssetProfile {
  name: string;
  process: AssetProcessor;
}

export interface AssetPreset {
  name: string;
  filter?: AssetFilter;
  profiles: AssetProfile[];
}

export interface AssetSource {
  node: NodeLink;
  filename: string;
}

export interface Asset {
  sources: AssetSource[];
  type: string;
  title?: string;
  alt?: string;
  url: string;
  originalUrl: string;
  filename?: string;
  presets: string[];
  profiles: {
    [profile: string]: AssetSrc;
  };
}
