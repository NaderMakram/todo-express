import mongoose from 'mongoose'
const { Schema } = mongoose;

const ToDoSchema = new Schema({
  title: String,
  description: String,
  finished: Boolean,
});

export default mongoose.model("ToDo", ToDoSchema);