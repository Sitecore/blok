import { DrawerDefault } from "./drawer-default";
import { DrawerScrollableContent } from "./drawer-scrollable";
import { DrawerDirections } from "./drawer-direction";


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


