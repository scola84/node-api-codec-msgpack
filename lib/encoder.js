const stream = require('stream');
const msgpack = require('msgpack-lite');

class MsgPackEncoder extends stream.Transform {
  constructor() {
    super({
      objectMode: true
    });

    this.encoder = new msgpack.Encoder();

    this.encoder.on('error', (error) => {
      this.emit('error', error);
    });

    this.encoder.on('data', (data) => {
      this.push(data);
    });
  }

  _transform(data, encoding, callback) {
    try {
      this.encoder.encode(data);
      callback();
    } catch (error) {
      callback(error);
    }
  }
}

module.exports = MsgPackEncoder;
