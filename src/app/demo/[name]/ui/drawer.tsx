import { DrawerDefault } from "./drawer-default";
import { DrawerScrollableContent } from "./drawer-scrollable";
import { DrawerDirections } from "./drawer-direction";

export const drawer = {
    name: "drawer",
    defaultComponent: (
        <DrawerDefault/>
    ),
    usage: [
        `import {\n  Drawer,\n  DrawerClose,\n  DrawerContent,\n  DrawerDescription,\n  DrawerFooter,\n  DrawerHeader,\n  DrawerTitle,\n  DrawerTrigger,\n} from "@/components/ui/drawer"`,
        `<Drawer>\n  <DrawerTrigger>Open</DrawerTrigger>\n  <DrawerContent>\n    <DrawerHeader>\n      <DrawerTitle>Are you absolutely sure?</DrawerTitle>\n      <DrawerDescription>This action cannot be undone.</DrawerDescription>\n    </DrawerHeader>\n    <DrawerFooter>\n      <Button>Submit</Button>\n      <DrawerClose>\n        <Button variant="outline">Cancel</Button>\n      </DrawerClose>\n    </DrawerFooter>\n  </DrawerContent>\n</Drawer>`,
    ],
    components: {
        "Default": <DrawerDefault/>,
        "Scrollable Drawer": <DrawerScrollableContent/>,
        "Drawer Directions": <DrawerDirections/>
    }
};


