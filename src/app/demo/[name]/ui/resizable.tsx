export const resizable = {
  name: "resizable",
  defaultComponent: "resizable",
  usage: [
    `import {\n  ResizablePanelGroup,\n  ResizablePanel,\n  ResizableHandle,\n} from "@/components/ui/resizable";`,
    `<ResizablePanelGroup direction="horizontal">\n <ResizablePanel>One</ResizablePanel>\n <ResizableHandle />\n <ResizablePanel>Two</ResizablePanel>\n</ResizablePanelGroup>`,
  ],
  components: {
    Vertical: "resizable-vertical",
    Handle: "resizable-handle",
  },
};
