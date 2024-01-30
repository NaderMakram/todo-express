import mongoose from 'mongoose'
const { Schema } = mongoose;

const ToDoSchema = new Schema({
  title: String,
  description: String,
  date: { type: Date, default: Date.now },
  finished: Boolean,
  comments: [{ body: String, date: Date }],
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    unique: true,
  },
});

export default mongoose.model("ToDo", ToDoSchema);