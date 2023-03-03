import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

interface IUser {
  fullname: string;
  username: string;
  password: string;
  avatar: string;
  refreshToken: string;
  socketID: string;
}

const userSchema = new Schema<IUser>(
  {
    fullname: { type: String },
    username: { type: String },
    password: { type: String },
    avatar: { type: String },
    refreshToken: { type: String },
    socketID: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = function (password: string) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5));
};

userSchema.methods.validPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
