var React = require('react');
var marked = require('marked');
import controller from './controller.list.js';

const Note = React.createClass({
  parseMarkdown: function() {
    let parsed = marked(this.props.children.toString(), {sanitize: true});
    return {__html: parsed};
  },

  render: function() {
    return (
      <div className="note">
        <h2 className="noteAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.parseMarkdown()} />
      </div>
    );
  }
});

const NoteList = React.createClass({
  render: function() {
    let notes = this.props.data.map(function(note) {
      return (
        <Note author={note.author} key={note.id}>
          {note.text}
        </Note>
      );
    })
    return (
      <div className="notesList">
        {notes}
      </div>
    );
  }
});

const NoteForm = React.createClass({
  getInitialState: () => ({author: '', text: ''}),
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!text || !author) return;

    this.props.create({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post"/>
      </form>
    );
  }
});

const Notes = React.createClass({
  loadNotes: function() {
    controller.notes.list(this);
  },
  makeNote: function(note) {
    let notes = this.state.data;
    let newNotes = notes.concat([note]);
    this.setState({data: newNotes});
    controller.notes.create(this, note);
  },
  getInitialState: () => {return {data: []}},
  componentDidMount: function() {
    this.loadNotes();
    setInterval(this.loadNotes, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="Notes">
        <h1>Notes</h1>
        <NoteList data={this.state.data} />
        <NoteForm create={this.makeNote} />
      </div>
    );
  }
});

export default Notes;
