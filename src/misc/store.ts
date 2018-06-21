import { observable } from "mobx";

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  extensions: string[];
  threshold: number;
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  extensions: ["jpg", "jpeg", "png", "gif"],
  threshold: 0.02
} as IStore);
