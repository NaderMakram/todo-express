import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  address: String,
});

export default mongoose.model("User", UserSchema);