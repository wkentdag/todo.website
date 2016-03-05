import request from 'superagent';

//  low-level request function
//  * @param m {str} http method
var r = (m, url, head, body) => {
  return new Promise((resolve, reject) => {
    var method = m.match(/get/i)
      ? 'GET'
      : m.match(/post/i)
        ? 'POST'
        : m.match(/put/i)
          ? 'PUT'
          : m.match(/patch/i)
            ? 'PATCH'
            : reject(new Error('invalid method type'))
    ;
    var req = request(method, url);
    if (head) req.set(head);
    if (body) req.send(body);
    req.end((err,res) => (err)? reject(err) : resolve(res.body));
  });
};

//  alias
module.exports = {
  get: (url) => r('get', url),
  post: (url, body, head) => r('post', url, head, body),
  patch: (url, body, head) => r('patch', url, head, body)
};
