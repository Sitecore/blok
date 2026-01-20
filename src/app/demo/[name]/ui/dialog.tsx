export const dialog = {
  name: "dialog",
  preview: {
    defaultComponent: "dialog",
  },
  usage: {
    usage: [
      `import {\n  Dialog,\n  DialogContent,\n  DialogDescription,\n  DialogFooter,\n  DialogHeader,\n  DialogTitle,\n  DialogTrigger,\n} from "@/components/ui/dialog";`,
      `<Dialog>\n <DialogTrigger>Open</DialogTrigger>\n <DialogContent>\n  <DialogHeader>\n   <DialogTitle>Edit profile</DialogTitle>\n   <DialogDescription>\n    Make changes to your profile here. Click save when you're done.\n   </DialogDescription>\n  </DialogHeader>\n </DialogContent>\n</Dialog>`,
    ]
  },
  components: {
    "Scrollable": { component: "dialog-scrollable", },
    "Sticky Footer": { component: "dialog-sticky-footer", },
  },
};
