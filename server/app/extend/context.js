/**
 *
 * @type {{foo(*)}}
 */
module.exports = {
  success(msg, data) {
    const res = JSON.stringify({
      code: '0',
      msg,
      data,
    });
    return res;
  },
  fail(msg) {
    const res = JSON.stringify({
      code: '-1',
      msg,
    });
    return res;
  },
  warn(msg) {
    const res = JSON.stringify({
      code: '1',
      msg,
    });
    return res;
  },
};
