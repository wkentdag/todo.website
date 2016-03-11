import mongoose, {Schema} from 'mongoose';

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
  },
  text: {
    type: String,
    required: true
  }
});

NoteSchema.virtual('status').get(function() {
  return (this.completed)
    ? 'done'
    : this.due.getTime() > new Date().getTime()
      ? 'open'
      : 'late';
});

NoteSchema.set('toJSON', { virtuals: true });
NoteSchema.set('toObject', { virtuals: true });

mongoose.model('Note', NoteSchema);
export default NoteSchema;
