const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  due: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  },
  complete: {
    type: Date
  }
});

// NoteSchema.virtual('status').get(() =>
//   (this.completed)
//     ? 'done'
//     : this.due.getTime() > new Date().getTime()
//       ? 'open'
//       : 'late'
// );

NoteSchema.set('toJSON', { virtuals: true });
NoteSchema.set('toObject', { virtuals: true });

mongoose.model('Note', NoteSchema);
export default mongoose.model('Note');
