"use client";

import * as React from "react";

import FormField from "./FormField";
import FormControls from "./FormControls";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { data, defaultValues, FormDataType, schema } from "../data";
import { zodResolver } from "@hookform/resolvers/zod";

const FormWrapper = () => {
  const form = useForm<FormDataType>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit(handleSubmit)();
        }}
      >
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <FormField
              key={item.id}
              id={item.id}
              label={item.label}
              helptext={item.helptext}
              required={item.required}
            />
          ))}
        </div>

        <FormControls />
      </form>
    </Form>
  );
};

export default FormWrapper;
