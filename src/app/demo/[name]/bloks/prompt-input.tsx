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
    FloatingVercelAI: {
      component: "prompt-input-floating-vercel",
    },
    Queued: {
      component: "prompt-input-queued",
    },
    QueuedVercelAI: {
      component: "prompt-input-queued-vercel",
    },
    Questions: {
      component: "prompt-input-questions",
    },
    QuestionsVercelAI: {
      component: "prompt-input-questions-vercel",
    },
  },
};
