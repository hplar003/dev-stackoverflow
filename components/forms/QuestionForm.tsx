"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { MDXEditorMethods } from "@mdxeditor/editor";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AskQuestionSchema } from "@/lib/validations";

import TagCard from "../cards/TagCard";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

// This is the only place InitializedMDXEditor is imported directly.
const Editor = dynamic(() => import("@/components/editor"), {
  // Make sure we turn SSR off
  ssr: false,
});

const QuestionForm = () => {
  const editorRef = useRef<MDXEditorMethods>(null);
  const form = useForm<z.infer<typeof AskQuestionSchema>>({
    resolver: zodResolver(AskQuestionSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });
  const handleCreateQuestion = () => {};
  const handleInputKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string[] }
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagInput = e.currentTarget.value.trim();
      if (tagInput && tagInput.length < 15 && !field.value.includes(tagInput)) {
        form.setValue("tags", [...field.value, tagInput]);
        e.currentTarget.value = "";
        form.clearErrors("tags");
      } else if (tagInput.length > 15) {
        form.setError("tags", {
          type: "manual",
          message: "Tag length must be less than 15 characters",
        });
      } else if (field.value.includes(tagInput)) {
        form.setError("tags", {
          type: "manual",
          message: "Tag already exists",
        });
      }
    }
  };

  const handleTagRemove = (tag: string, field: { value: string[] }) => {
    const newTags = field.value.filter((t) => t !== tag);
    form.setValue("tags", newTags);
    if (newTags.length === 0) {
      form.setError("tags", {
        type: "manual",
        message: "At least one tag is required",
      });
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateQuestion)}
        >
          <FormField
            control={form.control}
            name={"title"}
            render={({ field }) => (
              <>
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-medium text-dark400_light800">
                    Question Title <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]  border"
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Be specific and imagine you&apos;re asking a question to
                    another person.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name={"content"}
            render={({ field }) => (
              <>
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-medium text-dark400_light800">
                    Detailed explanation of your problem{" "}
                    <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Editor
                      editorRef={editorRef}
                      value={field.value}
                      fieldChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Introduce the problem and expand on what you&apos;ve put in
                    the title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <FormField
            control={form.control}
            name={"tags"}
            render={({ field }) => (
              <>
                <FormItem className="flex w-full flex-col ">
                  <FormLabel className="paragraph-medium text-dark400_light800 gap-3">
                    Tags <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type="text"
                        className="paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 no-focus min-h-[56px]  border"
                        placeholder="Add tags..."
                        onKeyDown={(e) => handleInputKeydown(e, field)}
                      />
                      {field.value.length > 0 && (
                        <div className="flex-start mt-2.5 flex-wrap">
                          {field?.value?.map((tag, index) => (
                            <TagCard
                              key={index}
                              name={tag}
                              _id={tag}
                              compact
                              remove
                              isButton
                              handleRemove={() => {
                                handleTagRemove(tag, field);
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="body-regular mt-2.5 text-light-500">
                    Add up to 3 tags to describe what your question is about.
                    press enter to add a tag
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <div className="mt-16 flex justify-end">
            <Button
              type="submit"
              className="primary-gradient  w-fit !text-light-900"
            >
              Ask a Question
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default QuestionForm;