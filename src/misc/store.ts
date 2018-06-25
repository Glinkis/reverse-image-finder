import { observable } from "mobx";

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  extensions: string[];
  threshold: number;
  searchedFiles: number;
  indexed: number;
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  extensions: ["jpg", "jpeg", "png", "psd"],
  threshold: 0.02,
  searchedFiles: 0,
  indexed: 0
} as IStore);
