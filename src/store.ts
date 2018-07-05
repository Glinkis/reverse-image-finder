import { observable } from "mobx";

export interface Image {
  data: Buffer;
  width: number;
  height: number;
  path: string;
}

export type Decoder = (image: string) => Promise<Image>;

export interface Store {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  decoders: Map<string, Decoder>;
  threshold: number;
  searchedFiles: number;
  indexed: number;
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  decoders: new Map<string, Decoder>(),
  threshold: 0.03,
  searchedFiles: 0,
  indexed: 0
} as Store);
