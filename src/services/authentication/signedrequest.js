const crypto = require('crypto');

module.exports = {
  base64: function base64Encoding(str) {
    return (new Buffer(str)).toString('base64');
  },

  sha1: function sha1Encryption(str) {
    const sum = crypto.createHash('sha1');
    sum.update(str);
    return sum.digest('hex');
  },

  signUser: function signUserRequest(user) {
    const message = this.base64(JSON.stringify({
      displayName: user.fullname,
      id: user.username
    }));
    const timestamp = Math.round(Date.now() / 1000);
    const signature = this.sha1('RQ2eD2Edvpi0NGI5zNmXOprl' + ' ' + message + ' ' + timestamp);

    return {
      message: message,
      timestamp: timestamp,
      signature: signature
    };
  }
};
