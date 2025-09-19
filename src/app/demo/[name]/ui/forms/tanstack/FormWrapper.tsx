"use client";

import * as React from "react";

import { useAppForm } from "@/components/ui/tanstack-form";
import FormField from "./FormField";
import FormControls from "./FormControls";
import { data, defaultValues, schema } from "../data";

const TanstackFormWrapper = () => {
  const form = useAppForm({
    defaultValues: defaultValues,
    onSubmit: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    validators: {
      onSubmit: schema,
    },
  });

  return (
    <form.AppForm>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          {data.map((item) => (
            <FormField
              key={item.id}
              id={item.id}
              label={item.label}
              helptext={item.helptext}
            />
          ))}
        </div>
        <FormControls />
      </form>
    </form.AppForm>
  );
};

export default TanstackFormWrapper;
