import { observable } from "mobx";

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  extensions: string[];
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  extensions: ["jpg", "jpeg", "png", "gif"]
} as IStore);
