import { decode } from 'msgpack-js';
import { Transform } from 'stream';
import { Buffer } from 'buffer';

export default class MsgPackDecoder extends Transform {
  constructor() {
    super({
      objectMode: true
    });
  }

  _transform(data, encoding, callback) {
    try {
      if (typeof Blob !== 'undefined' && data instanceof Blob) {
        this._blob(data, callback);
      } else {
        this.push(decode(data));
        callback();
      }
    } catch (error) {
      callback(error);
    }
  }

  _blob(data, callback) {
    const reader = new FileReader();

    reader.onerror = () => {
      callback(new Error(reader.error));
    };

    reader.onloadend = () => {
      if (reader.error) {
        callback(new Error(reader.error));
        return;
      }

      this.push(decode(Buffer.from(reader.result)));
      callback();
    };

    reader.readAsArrayBuffer(data);
  }
}
