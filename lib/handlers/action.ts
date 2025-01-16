"use server";

import { Session } from "next-auth";
import { ZodError, ZodSchema } from "zod";

import { auth } from "@/auth";

import { ValidationError } from "../http-errors";
import dbConnect from "../mongoose";

type actionOptions<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

/**
 * A generic handler for Server Action that handles schema validation and authentication.
 * @param {actionOptions<T>} options - The options for the action.
 * @returns {Promise<{params: T, session: Session | null}>} - An object with the validated params and the session.
 * @throws {ValidationError} If the params does not match the schema.
 * @throws {Error} If the user is unauthorized.
 */
async function action<T>({
  params,
  schema,
  authorize = false,
}: actionOptions<T>) {
  // Schema Validations
  /**
   * If schema is provided, validate the params against it.
   * @throws {ValidationError} If the params does not match the schema.
   */
  if (schema && params) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        return new Error("Schema Validation Failed");
      }
    }
  }

  /**
   * If authorization is required, retrieve the session.
   * @throws {Error} If the user is unauthorized.
   */
  let session: Session | null = null;
  if (authorize) {
    session = await auth();
    if (!session) {
      return new Error("Unauthorized");
    }
  }
  await dbConnect();
  return { params, session };
}

export default action;
