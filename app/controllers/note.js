const resource = require('../resources/notes');

module.exports = {
  list: resource.fetch,
  create: resource.create
};
