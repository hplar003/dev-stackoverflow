import { model, models, Schema, Document } from "mongoose";

export interface IUser {
  name: string;

  username: string;

  email: string;

  bio?: string;

  image?: string;

  location?: string;

  portfolio?: string;

  reputation?: number;
}

/**
 * This schema represents a user in the application.
 *
 * @remarks
 * The properties of this schema are as follows:
 *
 * - `name`: The name of the user.
 * - `username`: The username of the user.
 * - `email`: The email of the user.
 * - `bio`: The bio of the user. Optional field.
 * - `image`: The URL of the user's image.
 * - `location`: The location of the user. Optional field.
 * - `portfolio`: The URL of the user's portfolio. Optional field.
 * - `reputation`: The reputation score of the user. Optional field. Defaults to 0 if not specified.
 *
 * @example
 * {
 *   name: "John Doe",
 *   username: "john-doe",
 *   email: "john.doe@example.com",
 *   bio: "Software engineer at XYZ company",
 *   image: "https://example.com/john-doe.jpg",
 *   location: "New York, USA",
 *   portfolio: "https://example.com/john-doe"
 * }
 */

export interface IUserDoc extends IUser, Document {}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    image: { type: String },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/**
 * This is the model for the user schema.
 */
const User = models?.User || model<IUser>("User", UserSchema);

export default User;
