export const sheet = {
  name: "sheet",
  preview: {
    defaultComponent: "sheet",
  },
  usage: {
    usage: [
      `import {\n  Sheet,\n  SheetTrigger,\n  SheetContent,\n  SheetHeader,\n  SheetTitle,\n  SheetDescription,\n  SheetFooter,\n  SheetClose\n} from "@/components/ui/sheet";`,
      `<Sheet>\n <SheetTrigger>Open</SheetTrigger>\n <SheetContent>\n  <SheetHeader>\n   <SheetTitle>Are you absolutely sure?</SheetTitle>\n   <SheetDescription>\n    This action cannot be undone. This will permanently delete your account\n    and remove your data from our servers.\n   </SheetDescription>\n  </SheetHeader>\n </SheetContent>\n</Sheet>`,
    ],
  },
  components: {
    Directions: { component: "sheet-directions" },
  },
};
