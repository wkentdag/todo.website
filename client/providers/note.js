const request = require('../resources/request');

let getStatus = (k) => {  //  compute status based on completeness and due date
  let now = new Date().getTime();
  return (k.props.completed)
    ? 'done'
    : (k.props.due > now)
      ? 'open'
      : 'late'
  ;
};

module.exports = {
  status: {
    get: getStatus,
    update: (klass) => {
      return new Promise((resolve,reject) => {
        let newState = {status: undefined, completed: undefined};
        let completing = (klass.state.completed === null);  //  being completed
        newState.status = (completing)? 'done' : getStatus(klass);
        newState.completed = (completing)? new Date().getTime() : null;
        resolve(newState);
      })
    }
  }
}
