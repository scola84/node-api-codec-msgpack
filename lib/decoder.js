const stream = require('stream');
const msgpack = require('msgpack-lite');

class MsgPackDecoder extends stream.Transform {
  constructor() {
    super({
      objectMode: true
    });

    this.decoder = new msgpack.Decoder();

    this.decoder.on('error', (error) => {
      this.emit('error', error);
    });

    this.decoder.on('data', (data) => {
      this.push(data);
    });
  }

  _transform(data, encoding, callback) {
    try {
      if (typeof Blob !== 'undefined' && data instanceof Blob) {
        this._blob(data, callback);
      } else {
        this.decoder.decode(data);
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

      this.decoder.decode(Buffer.from(reader.result));
      callback();
    };

    reader.readAsArrayBuffer(data);
  }
}

module.exports = MsgPackDecoder;
