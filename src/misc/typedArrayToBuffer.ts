type TypedArray =
  | Buffer
  | Uint8Array
  | Uint8ClampedArray
  | Uint16Array
  | Uint32Array;

export const typedArrayToBuffer = (array: TypedArray) => {
  if (array instanceof Buffer) {
    return array;
  }
  const buffer = Buffer.from(array.buffer as ArrayBuffer);

  if (array.byteLength !== array.buffer.byteLength) {
    buffer.set(
      buffer.slice(array.byteOffset, array.byteOffset + array.byteLength)
    );
  }
  return buffer;
};
