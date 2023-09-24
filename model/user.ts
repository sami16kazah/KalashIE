import mongoose from "mongoose";

interface UserAttributes {
  name: string;
  email: string;
  password: string;
  phone: string;
  location?: string;
  verifiedToken?: string;
  resetToken?: string;
  resetTokenExpiration?: string;
  role: string;
  //workinghours?: number;
  //eventlist
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    location: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    verifiedToken: {
      type: String,
    },
    resetToken: {
      type: String,
    },

    resetTokenExpiration: { type: Date },
  },
  // to prevent sending password after sign up
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.phone;
        delete ret.role;
        delete ret.verifiedToken;
        delete ret.resetToken;
        delete ret.__v;
      },
    },
  }
);

const User = mongoose.model("User", UserSchema);

const buildNewUser = (attrs: UserAttributes) => {
  return new User(attrs);
};

export { User, buildNewUser };
