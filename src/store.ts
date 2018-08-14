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
  indexedFiles: number;
  isSearching: boolean;
  logIndexing: boolean;
  matches: string[];
  searchedFiles: number;
  threshold: number;
}

export const store = observable<Store>({
  decoders: new Map<string, Decoder>(),
  directory: null,
  image: null,
  indexedFiles: 0,
  isSearching: false,
  logIndexing: false,
  matches: [],
  searchedFiles: 0,
  threshold: 0.03
});
