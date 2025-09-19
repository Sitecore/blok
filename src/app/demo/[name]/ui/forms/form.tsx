import TanstackFormWrapper from "./tanstack/FormWrapper";
import ReactHookFormWrapper from "./reacthookform/FormWrapper";

export const form = {
  name: "form",
  components: {
    ReactHookForm: (
      <>
        <h3 className="mb-2">React Hook Form</h3>
        <ReactHookFormWrapper />
      </>
    ),
    TanstackForm: (
      <>
        <h3 className="mb-2">Tanstack Form</h3>
        <TanstackFormWrapper />
      </>
    ),
  },
};
