const resources = require('../resources/request.js');
const providers = require('../providers/note.js');

let urlˆ = (data, stem) => Promise.resolve(
  data.map(d => {
    d.url = stem + `/${d._id}`;
    return d;
  })
);

module.exports = {
  notes: {
    list: (klass) => {
      resources.get(klass.props.url)
      .then(data => urlˆ(data, klass.props.url))
      .then(data => klass.setState({notes: data}) )
      .catch(err => console.error(err));
    },
    create: (klass, note) => {
      resources.post(klass.props.url, note)
      .then(data => urlˆ(data, klass.props.url))
      .then(data => klass.setState({notes: data}) )
      .catch(err => console.error(err));
    }
  },
  note: {
    status: {
      get: providers.status.get,
      update: (klass) => {
        providers.status.update(klass)
        .then(newState => klass.setState(newState))
        .then( () => {
          let url = klass.props.url;
          if (klass.state.completed) url += `?completed=${klass.state.completed}`;
          return resources.patch(url);
        })
        .then(data => console.log(`done!\n${data}`))
        .catch(err => console.error(err));
      }
    }
  }
};
