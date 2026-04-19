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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Compose a queue panel above the field; drive PromptInputSubmit with status="streaming" for stop.
<Collapsible defaultOpen>
  <CollapsibleTrigger>{/* chevron + "N prompts queued" */}</CollapsibleTrigger>
  <CollapsibleContent>{/* pending rows */}</CollapsibleContent>
</Collapsible>
<PromptInput variant="default" onSubmit={handleSubmit}>
  {/* header / body / footer */}
  <PromptInputSubmit status={busy ? "streaming" : "ready"} />
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
  },
};
