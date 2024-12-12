import { model, models, Schema, Types } from "mongoose";
export interface IAccount {
  userID: Types.ObjectId;
  name: string;
  image?: string;
  password?: string;
  provider: string;
  providerAccountId: string;
}
const AccountSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    password: { type: String },
    provider: { type: String },
    providerAccountId: { type: String },
  },
  { timestamps: true }
);

const account = models?.Account || model<IAccount>("Account", AccountSchema);

export default account;
