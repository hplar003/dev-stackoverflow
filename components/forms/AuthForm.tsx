"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { ActionResponse } from "@/types/global";

interface AuthFormProps<T extends FieldValues> {
  schema: z.ZodSchema<T>;
  defaultValues: T;
  formType: "SIGN_UP" | "SIGN_IN";
  onSubmit: (data: T) => Promise<ActionResponse>;
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  // 2. Define a submit handler.
  const handleSubmit: SubmitHandler<T> = async (data) => {
    console.log(data);
    const result = (await onSubmit(data)) as ActionResponse;
    if (result?.success) {
      toast({
        title: "Success",
        description:
          formType === "SIGN_IN"
            ? "Signed In Successfully"
            : "Signed Up Successfully",
      });
      router.push(ROUTES.HOME);
    } else {
      toast({
        title: `Error ${result?.status}`,
        description: result?.error?.message,
        variant: "destructive",
      });
    }
  };

  const buttonText = formType === "SIGN_UP" ? "Sign Up" : "Sign In";

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <>
                  <FormItem className="flex w-full flex-col gap-2.5">
                    <FormLabel className="paragraph-medium text-dark400_light700">
                      {field.name === "email"
                        ? "Email Address"
                        : field.name.charAt(0).toUpperCase() +
                          field.name.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type={field.name === "password" ? "password" : "text"}
                        {...field}
                        className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-1.5 border"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          ))}

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="primary-gradient paragraph-medium min-h-12 w-full rounded-2 px-4 py-3 font-inter !text-light-900"
          >
            {form.formState.isSubmitting
              ? buttonText === "Sign In"
                ? "Signing In..."
                : "Signing Up..."
              : buttonText}
          </Button>
          {formType === "SIGN_IN" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign Up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient"
              >
                Sign In
              </Link>
            </p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
