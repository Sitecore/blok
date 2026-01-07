export const scrollArea = {
  name: "scrollarea",
  preview: {
    defaultComponent: "scroll-area",
  },
  usage: {
    usage: [
      `import { ScrollArea } from "@/components/ui/scroll-area";`,
      `<ScrollArea className="h-[200px] w-[350px]">\n Jokester began sneaking into the castle in the middle of the night and\n leaving jokes all over the place: under the king's pillow, in his soup,\n even in the royal toilet. The king was furious, but he couldn't seem to\n stop Jokester. And then, one day, the people of the kingdom discovered\n that the jokes left by Jokester were so funny that they couldn't help\n but laugh. And once they started laughing, they couldn't stop.\n</ScrollArea>`,
    ]
  },  
  components: {
    Vertical: { component: "scroll-area", },
    Horizontal: { component: "scroll-area-horizontal", },
  },
};
