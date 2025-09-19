import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";
import * as React from "react";

const {
  fieldContext,
  formContext,
  useFieldContext: useInternalFieldContext,
  useFormContext: useInternalFormContext,
} = createFormHookContexts();

const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormItem,
  },
  formComponents: {},
});

import { formOptions } from "@tanstack/react-form";

// This is a hacky way to apply typescript generics to the useAppForm hook
const hackyWayToApplyTypescript = <TValues extends Record<string, any>>(
  options: ReturnType<typeof formOptions>
) => {
  // @ts-expect-error they still haven't sorted a good way to type stuff like that
  const _formOptions = formOptions<TValues>({
    ...options,
  });

  // @ts-expect-error they still haven't sorted a good way to type stuff like that
  const form = useAppForm<TValues>({ ..._formOptions });

  return form;
};

export type FormType<TValues extends Record<string, any>> = ReturnType<
  typeof hackyWayToApplyTypescript<TValues>
>;

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

const useFieldContext = () => {
  const { id } = React.useContext(FormItemContext);
  const { state, name, store, ...fieldContext } = useInternalFieldContext();

  const errors = useStore(store, (state) => state.meta.errors);
  if (!fieldContext) {
    throw new Error("useFieldContext should be used within <FormItem>");
  }

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    errors,
    store,
    state,
    ...fieldContext,
  };
};

const useFormContext = () => {
  const formContext = useInternalFormContext();
  if (!formContext) {
    throw new Error("useFormContext should be used within <AppForm>");
  }
  return {
    ...formContext,
    state: formContext.state,
    // @ts-expect-error weird typing issue
    AppField: formContext.AppField as unknown as ReturnType<
      typeof useAppForm
    >["AppField"],
  };
};

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { formItemId, errors } = useFieldContext();

  return (
    <Label
      data-slot="form-label"
      data-error={!!errors.length}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { errors, formItemId, formDescriptionId, formMessageId } =
    useFieldContext();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !errors.length
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!errors.length}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFieldContext();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { errors, formMessageId } = useFieldContext();
  const body = errors.length
    ? String(errors.at(0)?.message || errors.at(0) || "")
    : props.children;
  if (!body) return null;

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  useAppForm,
  useFormContext,
  useInternalFormContext,
  useFieldContext,
  withForm,
  withFieldGroup,
};
