"use client";

import * as React from "react";

import { Input } from "@/components/ui/input";
import {
  FormDescription,
  FormField as ReactFormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldDataType } from "../data";

const FormField = ({ label, id, helptext, required }: FieldDataType) => {
  return (
    <ReactFormField
      name={id}
      render={(field) => {
        return (
          <div className="w-full">
            <FormLabel>
              {label}
              {required && <span className="text-red-500 -ml-1">*</span>}
            </FormLabel>

            <Input
              value={(field.field.value || "") as string}
              onBlur={field.field.onBlur}
              onChange={(e) => {
                field.field.onChange(e.target.value);
              }}
            />

            <div className="flex flex-row items-center justify-between">
              <FormDescription>{helptext}</FormDescription>
            </div>

            <FormMessage />
          </div>
        );
      }}
    />
  );
};

export default FormField;
