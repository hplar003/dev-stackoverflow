import { model, models, Schema } from "mongoose";

/**
 * Interface representing a user in the application.
 */
export interface IUser {
  /**
   * The name of the user.
   */
  name: string;

  /**
   * The username of the user.
   */
  username: string;

  /**
   * The email of the user.
   */
  email: string;

  /**
   * The bio of the user.
   * Optional field.
   */
  bio?: string;

  /**
   * The URL of the user's image.
   */
  image: string;

  /**
   * The location of the user.
   * Optional field.
   */
  location?: string;

  /**
   * The URL of the user's portfolio.
   * Optional field.
   */
  portfolio?: string;

  /**
   * The reputation score of the user.
   * Optional field. Defaults to 0 if not specified.
   */
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

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    bio: { type: String },
    image: { type: String, required: true },
    location: { type: String },
    portfolio: { type: String },
    reputation: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/**
 * This is the model for the user schema.
 */
const user = models?.user || model<IUser>("user", UserSchema);

export default user;
