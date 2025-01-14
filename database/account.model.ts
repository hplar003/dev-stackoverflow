import { model, models, Schema, Types } from "mongoose";

export interface IAccount {
  userID: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}
export interface IAccountDoc extends IAccount, Document {}
const AccountSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String },
    password: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
  },
  { timestamps: true }
);

const Account = models?.Account || model<IAccount>("Account", AccountSchema);

export default Account;
