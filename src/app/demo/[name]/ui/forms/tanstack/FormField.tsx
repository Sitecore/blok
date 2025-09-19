"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import { FormType, useFormContext } from "@/components/ui/tanstack-form";
import { FieldDataType, FormDataType } from "../data";

const FormField = ({ label, id, helptext }: FieldDataType) => {
  const form = useFormContext() as unknown as FormType<FormDataType>;

  return (
    <form.AppField
      name={id as keyof FormDataType}
      children={(field) => {
        return (
          <field.FormItem className="w-full">
            <field.FormLabel>{label}</field.FormLabel>
            <field.FormControl>
              <Input
                value={(field.state.value || "") as string}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.target.value);
                }}
              />
            </field.FormControl>
            <div className="flex flex-row items-center justify-between">
              <field.FormDescription>{helptext}</field.FormDescription>
            </div>

            <field.FormMessage />
          </field.FormItem>
        );
      }}
    />
  );
};

export default FormField;
