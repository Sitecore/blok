"use client";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";

const FormControls = () => {
  const form = useFormContext();
  const { isDirty, isSubmitting } = form.formState;

  return (
    <div className="flex w-full flex-row items-center justify-end gap-2 pt-4">
      <Button
        variant="ghost"
        colorScheme="neutral"
        type="reset"
        onClick={() => form.reset()}
        disabled={!isDirty || isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={!isDirty || isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};
export default FormControls;
