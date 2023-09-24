import mongoose from "mongoose";

interface AdminAttr {
  email: string;
  password: string;
}

const AdminSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

const Admin = mongoose.model("Admin", AdminSchema);

const buildAdmin = (attrs: AdminAttr) => {
  return new Admin(attrs);
};

export { Admin, buildAdmin };
