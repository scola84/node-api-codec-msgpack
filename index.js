const type = 'application/msgpack';

import { default as Decoder } from './src/decoder';
import { default as Encoder } from './src/encoder';

export const codec = {
  Decoder,
  Encoder
};

export function decoder() {
  return {
    type,
    create: () => new Decoder()
  };
}

export function encoder() {
  return {
    type,
    create: () => new Encoder()
  };
}
