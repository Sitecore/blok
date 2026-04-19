export const promptInput = {
  name: "prompt-input",
  preview: {
    defaultComponent: "prompt-input",
  },
  usage: {
    usage: [
      `import { promptInputDemoAttachMenu } from "@/app/content/bloks/prompt-input";
import {
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
      <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
    </PromptInputToolbar>
    <PromptInputActions>
      <PromptInputMicButton />
      <PromptInputSubmit />
    </PromptInputActions>
  </PromptInputFooter>
</PromptInput>`,
      `import { promptInputDemoAttachMenu } from "@/app/content/bloks/prompt-input";
import {
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

// Floating variant — for in-page editing and canvas
// Uses inline toolbar (single-line row) + regular toolbar (multiline column)
<PromptInput variant="floating" onSubmit={(msg) => console.log(msg)}>
  <PromptInputHeader>
    <PromptInputAttachments />
  </PromptInputHeader>
  <PromptInputToolbar inline>
    <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
  </PromptInputToolbar>
  <PromptInputBody>
    <PromptInputTextarea placeholder="Edit this page…" />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputToolbar>
      <PromptInputAttachButton attachMenu={promptInputDemoAttachMenu} />
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
