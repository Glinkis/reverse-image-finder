import { observable } from "mobx";

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  extensions: string[];
  threshold: number;
  imageData: ImageData | null;
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  extensions: ["jpg", "jpeg", "png", "psd"],
  threshold: 0.02,
  imageData: null
} as IStore);
