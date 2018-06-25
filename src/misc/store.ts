import { observable } from "mobx";
import { Image } from "./resizeImageData";

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  decoders: Array<{ ext: string; decode(image: string): Promise<Image> }>;
  threshold: number;
  searchedFiles: number;
  indexed: number;
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  decoders: [],
  threshold: 0.02,
  searchedFiles: 0,
  indexed: 0
} as IStore);
