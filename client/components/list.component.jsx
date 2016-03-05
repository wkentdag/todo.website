var React = require('react');
var marked = require('marked');
var classNames = require('classnames');

const controller = require('../controllers/list.controller.js');


const Note = React.createClass({

  parseMarkdown: function() {
    let parsed = marked(this.props.children.toString(), {sanitize: true});
    return {__html: parsed};
  },

  handleToggle: function(e) {
    return controller.note.status.update(this);
  },

  getInitialState: function() {
    return {
      completed: (this.props.completed)?this.props.completed : null,
      status: controller.note.status.get(this)
    };
  },

  render: function() {
    return (
      <div className={ classNames({ [`task ${this.state.status}`]: true }) }>
        <input type='checkbox'
          defaultChecked={(this.state.completed)}
          onChange={this.handleToggle}
        />
        <span dangerouslySetInnerHTML={this.parseMarkdown()} />
      </div>
    );
  }
});

const NoteList = React.createClass({
  render: function() {
    let notes = this.props.notes.map(function(note) {
      return (
        <Note
          due={note.due}
          key={note.id}
          completed={note.completed}
          url={note.url}
        >
          {note.text}
        </Note>
      );
    });
    return (
      <div className="notesList">
        {notes}
      </div>
    );
  }
});

//  @props  submit {func(obj)}  function to apply
const NoteForm = React.createClass({

  handleDueChange: function(e) {
    this.setState({due: e.target.value});
  },

  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();
    let due = this.state.due;
    let text = this.state.text.trim();
    if (!due || !text) return;

    this.setState({due: '', text: ''});
    this.props.submit({due: due, text: text});
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
          placeholder="Say something..."
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
const Notes = React.createClass({

  //  api
  list: function() {
    controller.notes.list(this);
  },
  create: function(note) {
    controller.notes.create(this, note);
  },

  //  react
  componentDidMount: function() {
    this.list();
    setInterval(this.list, this.props.pollInterval);
  },
  getInitialState: function() {
    return {notes: []}
  },

  render: function() {
    return (
      <div className="Notes">
        <h1>Notes</h1>
        <NoteList notes={this.state.notes} />
        <NoteForm submit={this.create} />
      </div>
    );
  }

});

export default Notes;
