import { observable } from "mobx";
import { Image } from "./resizeImageData";

export type Decoder = (image: string) => Promise<Image>;

export interface IStore {
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
  threshold: 0.02,
  searchedFiles: 0,
  indexed: 0
} as IStore);
