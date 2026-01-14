import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SheetDirections from "@/app/demo/[name]/ui/sheet-directions";

export const sheet = {
  name: "sheet",
  defaultComponent: (
    <div className="flex flex-col gap-6 md:flex-row">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default">Open</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-name">Name</Label>
              <Input id="sheet-demo-name" name="name" defaultValue="Liz" autoComplete="name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sheet-demo-username">Username</Label>
              <Input id="sheet-demo-username" name="username" defaultValue="@liz" autoComplete="username" />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="ghost" colorScheme="neutral">Cancel</Button>
            </SheetClose>
            <Button type="submit">Save</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  ),
  usage: [
    `import {\n  Sheet,\n  SheetTrigger,\n  SheetContent,\n  SheetHeader,\n  SheetTitle,\n  SheetDescription,\n  SheetFooter,\n  SheetClose\n} from "@/components/ui/sheet";`,
    `<Sheet>\n <SheetTrigger>Open</SheetTrigger>\n <SheetContent>\n  <SheetHeader>\n   <SheetTitle>Are you absolutely sure?</SheetTitle>\n   <SheetDescription>\n    This action cannot be undone. This will permanently delete your account\n    and remove your data from our servers.\n   </SheetDescription>\n  </SheetHeader>\n </SheetContent>\n</Sheet>`,
  ],
  components: {
    Directions: (
      <SheetDirections />
    )
  }
};
