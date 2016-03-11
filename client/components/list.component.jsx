const React = require('react');
const marked = require('marked');
const classNames = require('classnames');
const provider = require('../providers/notes.provider.js');


const Note = React.createClass({
  parseMarkdown: function() {
    let parsed = marked(this.props.children.toString(), {sanitize: true});
    return {__html: parsed};
  },

  handleToggle: function(e) {
    //  update state immediately/optimistically
    let now = new Date().getTime();
    let completed = this.state.completed;
    let completing = (completed)? null : now;
    let due = this.state.due;
    let status = (completing)
      ? 'done'
      : (due && due < now)
        ? 'late'
        : 'open'
    ;
    this.setState({completed: completing, status: status});

    //  make request to sockets/api
    let url = this.props.url;
    if (completing) url += `?completed=${completing}`;
    provider.update(url, this.props.socket, completing, this.props.id)
    .catch(httpErr => console.error(httpErr));
  },

  //  update state before making request to resource
  getInitialState: function() {
    return {
      completed: (this.props.completed)?this.props.completed : null,
      status: this.props.status,
      due: this.props.due
    };
  },

  render: function() {
    return (
      <div className={ classNames({ [`task ${this.state.status}`]: true }) }>
        <input type='checkbox'
          defaultChecked={(this.state.completed)}
          onClick={this.handleToggle}
        />
        <span dangerouslySetInnerHTML={this.parseMarkdown()} />
      </div>
    );
  }
});

const Notes = React.createClass({
  render: function() {
    let socket = this.props.socket;
    let mappedNotes = this.props.notes.map(note => {
      console.log(socket);
      note.socket = socket;
      console.log(note);
      return note;
    })
    .map(note => {
      console.log(note);
      return (
        <Note
          key={note._id}
          id={note._id}
          due={note.due}
          status={note.status}
          url={note.url}
          socket={note.socket}
        >
          {note.text}
        </Note>
      );
    });

    return (
      <div className="notesList">
        {mappedNotes}
      </div>
    );
  }
});

//  @props  submit {func(obj)}  function to apply
const NoteForm = React.createClass({

  handleDueChange: function(e) {
    console.log(this.state);
    this.setState({due: e.target.value});
    console.log(this.state);
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let due = this.state.due;
    let text = this.state.text.trim();
    if (!text) return;

    this.setState({due: '', text: ''});
    this.props.submit({due: due, text: text})
  },
  getInitialState: function() {
    return {due: '', text: ''};
  },

  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Item"
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input
          type="text"
          placeholder="Due"
          value={this.state.due}
          onChange={this.handleDueChange}
        />
        <input type="submit" value="Post"/>
      </form>
    );
  }

});

// @props   pollInterval {int} frequency w/which to fetch notes from server
// @props   url          {str} api endpoint for notes
const List = React.createClass({
  //  api
  list: function() {
    provider.list(this.props.url)
    .then(data => {
      console.log(data);
      this.setState({notes: data})
    })
    .catch(err => console.error(err));
  },
  create: function(note) {
    provider.create(this.props.url, this.state.socket, note)
    .then( data =>
      this.setState({notes: data})
    )
    .catch(err => console.error(err));
  },

  //  react
  componentDidMount: function() {
    this.list();

    let socket = require('socket.io-client')('http://localhost:3000',
      {transports: ['websocket','polling']}
    );
    socket.on('connect', () => {
      console.log('connect!');
      this.setState({socket: socket});
    });
    socket.on('note:new', data => {
      console.log(`data ${JSON.stringify(data)}`);
    });
  },
  getInitialState: function() {
    return {notes: [], socket: null};
  },

  render: function() {
    return (
      <div className="Notes">
        <h1>Notes</h1>
        <Notes
          notes={this.state.notes}
          socket={this.state.socket}
        />
        <NoteForm submit={this.create} />
      </div>
    );
  }
});

export default List;
