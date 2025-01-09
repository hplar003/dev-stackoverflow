import { NextResponse } from "next/server";

import Account from "@/database/account.model";
import handleError from "@/lib/handlers/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";

// get user by id

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account not found");
  }
  try {
    await dbConnect();
    const user = await Account.findById(id);
    if (!user) throw new NotFoundError("Account not found");
    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
// Update user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account not found");
  }
  try {
    await dbConnect();
    const body = await request.json();
    const validatedData = AccountSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const updatedAccount = await Account.findByIdAndUpdate(
      id,
      validatedData.data,
      {
        new: true,
      }
    );

    if (!updatedAccount) throw new NotFoundError("Account not found");
    return NextResponse.json(
      { success: true, data: updatedAccount },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// delete user

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User not found");
  }
  try {
    await dbConnect();
    const account = await Account.findByIdAndDelete(id);
    if (!account) throw new NotFoundError("Account not found");
    return NextResponse.json({ success: true, data: account }, { status: 204 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
