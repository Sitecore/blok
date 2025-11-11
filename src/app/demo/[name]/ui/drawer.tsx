import { DrawerDefault } from "@/app/demo/[name]/ui/drawer-default";
import { DrawerScrollableContent } from "@/app/demo/[name]/ui/drawer-scrollable";
import { DrawerDirections } from "@/app/demo/[name]/ui/drawer-direction";


export const drawer = {
    name: "drawer",
    components: {
        Default: (
            <DrawerDefault/>
        ),
        ScrollableDrawer: (
            <DrawerScrollableContent/>
        ),
        DrawerDirections: (
            <DrawerDirections/>
        )
    }
};


