import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import dbConnect from "@/lib/mongoose";

export async function POST(request: Request) {
  const { providerAccountID } = await request.json();
  try {
    await dbConnect();
    const validatedData = AccountSchema.partial().safeParse({
      providerAccountID,
    });
    if (!validatedData.success)
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    const account = await Account.findOne({ providerAccountID });
    if (!account) throw new NotFoundError("Account not found");
    return NextResponse.json({ success: true, data: account }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
