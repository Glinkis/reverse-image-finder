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
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  decoders: Map<string, Decoder>;
  threshold: number;
  searchedFiles: number;
  indexed: number;
  indexedDir: string;
  logIndexing: boolean;
}

export const store = observable({
  decoders: new Map<string, Decoder>(),
  directory: null,
  image: null,
  images: [],
  indexed: 0,
  indexedDir: "",
  isSearching: false,
  logIndexing: false,
  searchedFiles: 0,
  threshold: 0.03
} as Store);
