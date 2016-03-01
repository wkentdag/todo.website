import request from '../../resources/request.js';

module.exports = {
  notes: {
    list: (klass) => {
      request.get(klass.props.url)
      .then((data) => klass.setState({data: data}) )
      .catch((err) => console.error(err));
    },
    create: (klass, note) => {
      request.post(klass.props.url, note)
      .then((data) => klass.setState({data: data}) )
      .catch((err) => console.error(err));
    }
  }
};
