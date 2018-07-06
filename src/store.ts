import { observable } from "mobx";

export type TypedArray =
  | Buffer
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array;

export type ImageBuffer = {
  data: TypedArray;
  width: number;
  height: number;
};

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
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  decoders: new Map<string, Decoder>(),
  threshold: 0.03,
  searchedFiles: 0,
  indexed: 0,
  indexedDir: ""
} as Store);
