import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.User || mongoose.model<User>("User", userSchema);
