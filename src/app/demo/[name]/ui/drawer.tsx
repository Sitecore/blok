export const drawer = {
    name: "drawer",
    defaultComponent: "drawer",
    usage: [
        `import {\n  Drawer,\n  DrawerClose,\n  DrawerContent,\n  DrawerDescription,\n  DrawerFooter,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerTrigger,\n} from "@/components/ui/drawer"`,
        `<Drawer>\n  <DrawerTrigger>Open</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Are you absolutely sure?</DrawerTitle>\n      <DrawerDescription>This action cannot be undone.</DrawerDescription>\n    </DrawerHeader>\n    <DrawerFooter>\n      <Button>Submit</Button>\n      <DrawerClose>\n        <Button variant="outline">Cancel</Button>\n      </DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`,
    ],
    components: {
        "Scrollable Drawer": "drawer-scrollable",
        "Drawer Directions": "drawer-direction",
    }
};


