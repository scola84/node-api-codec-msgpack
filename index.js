const type = 'application/msgpack';

import { default as Encoder } from './src/encoder';
import { default as Decoder } from './src/decoder';

export const codec = {
  Decoder,
  Encoder
};

export function decoder(options) {
  return {
    type,
    create: () => new Decoder(options)
  };
}

export function encoder(options) {
  return {
    type,
    create: () => new Encoder(options)
  };
}
