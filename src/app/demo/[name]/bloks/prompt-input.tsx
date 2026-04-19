export const promptInput = {
  name: "prompt-input",
  preview: {
    defaultComponent: "prompt-input",
  },
  usage: {
    usage: [
      `import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputActions,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/bloks/prompt-input"`,
      `<PromptInput onSubmit={(msg) => console.log(msg.text)}>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputActions>
      <PromptInputSubmit />
    </PromptInputActions>
  </PromptInputFooter>
</PromptInput>`,
    ],
  },
  components: {
    Floating: {
      component: "prompt-input-floating",
    },
    Queued: {
      component: "prompt-input-queued",
    },
    Questions: {
      component: "prompt-input-questions",
    },
  },
};
