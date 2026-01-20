export const resizable = {
  name: "resizable",
  preview: {
    defaultComponent: "resizable",
  },
  usage: {
    usage: [
      `import {\n  ResizablePanelGroup,\n  ResizablePanel,\n  ResizableHandle,\n} from "@/components/ui/resizable";`,
      `<ResizablePanelGroup direction="horizontal">\n <ResizablePanel>One</ResizablePanel>\n <ResizableHandle />\n <ResizablePanel>Two</ResizablePanel>\n</ResizablePanelGroup>`,
    ],
  },
  components: {
    Vertical: { component: "resizable-vertical" },
    Handle: { component: "resizable-handle" },
  },
};
