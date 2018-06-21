import { observable } from "mobx";

export interface IFile {
  path: string;
  name: string;
}

export interface IStore {
  image: string | null;
  directory: string | null;
  isSearching: boolean;
  similarImages: IFile[];
}

export const store = observable({
  image: null,
  directory: null,
  isSearching: false,
  similarImages: []
} as IStore);
