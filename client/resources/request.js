import request from 'superagent';

module.exports = {
  get: (url) => {
    return new Promise((resolve, reject) => {
      request
      .get(url)
      .end((err,res) => (err)? reject(err) : resolve(res.body));
    });
  },
  post: (url, body, headers) => {
    return new Promise((resolve, reject) => {
      var req = request.post(url).send(body);
      if (headers) req.set(headers);

      req.end((err,res) => (err)? reject(err) :resolve(res.body));
    });
  }
};
