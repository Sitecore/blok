export const promptInput = {
  name: "prompt-input",
  preview: {
    defaultComponent: "prompt-input",
  },
  usage: {
    usage: [
      `import {
  PromptInput,
  PromptInputActions,
  PromptInputAttachButton,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputMicButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from "@/components/bloks/prompt-input";

// Default variant — for chatbots
<PromptInput variant="default" onSubmit={(msg) => console.log(msg)}>
  <PromptInputHeader>
    <PromptInputAttachments />
  </PromptInputHeader>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputToolbar>
      <PromptInputAttachButton />
    </PromptInputToolbar>
    <PromptInputActions>
      <PromptInputMicButton />
      <PromptInputSubmit />
    </PromptInputActions>
  </PromptInputFooter>
</PromptInput>`,
      `// Floating variant — for in-page editing and canvas
// Uses inline toolbar (single-line row) + regular toolbar (multiline column)
<PromptInput variant="floating" onSubmit={(msg) => console.log(msg)}>
  <PromptInputAttachments />
  <PromptInputToolbar inline>
    <PromptInputAttachButton />
  </PromptInputToolbar>
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputToolbar>
      <PromptInputAttachButton />
    </PromptInputToolbar>
    <PromptInputActions>
      <PromptInputMicButton />
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
  },
};
