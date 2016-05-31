import { encode } from 'msgpack-js';
import { Transform } from 'stream';

export default class MsgPackEncoder extends Transform {
  constructor() {
    super({
      objectMode: true
    });
  }

  _transform(data, encoding, callback) {
    try {
      this.push(encode(data));
      callback();
    } catch (error) {
      callback(error);
    }
  }
}
