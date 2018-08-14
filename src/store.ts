import { observable } from "mobx";

export type TypedArray =
  | Buffer
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array;

export interface ImageBuffer {
  channels: number;
  data: TypedArray;
  width: number;
  height: number;
}

export type Decoder = (image: string) => Promise<ImageBuffer>;

export interface Store {
  decoders: Map<string, Decoder>;
  directory: string | null;
  image: string | null;
  images: string[];
  indexed: number;
  isSearching: boolean;
  logIndexing: boolean;
  searchedFiles: number;
  threshold: number;
}

export const store = observable({
  decoders: new Map<string, Decoder>(),
  directory: null,
  image: null,
  images: [],
  indexed: 0,
  isSearching: false,
  logIndexing: false,
  searchedFiles: 0,
  threshold: 0.03
} as Store);
