import { observable } from "mobx";

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  images: string[];
  errors: Error[];
  extensions: string[];
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  images: [],
  errors: [],
  extensions: ["jpg", "jpeg", "png", "gif", "tif", "tiff", "eps", "svg", "tga"]
} as IStore);
