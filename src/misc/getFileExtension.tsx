export const getFileExtension = (file: string) => {
  return file
    .split(".")
    .reverse()[0]
    .toLowerCase();
};
