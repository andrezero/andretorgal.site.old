export interface Asset {
  type: string;
  name?: string;
  url: string;
}

export interface ImageAsset extends Asset {
  res: { w: number; h: number };
}
