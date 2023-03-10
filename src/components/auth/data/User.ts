import { model, Schema, Types } from "mongoose";

type UserSchema = {
  name: string;
  passwordHash: string;
  roles: string[];
  createdAt: Date;
  refreshToken?: string | undefined;
};

export type UserType = UserSchema & {
  _id: Types.ObjectId;
};

const userSchema = new Schema<UserSchema>({
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  refreshToken: String,
  roles: {
    type: [String],
    default: ["User"], // TODO enum roles
  },
  createdAt: { type: Date, default: Date.now },
});

const User = model("User", userSchema);

export default User;
