import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const accordion = {
  name: "accordion",
  defaultComponent: (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Why do developers prefer dark mode?</AccordionTrigger>
        <AccordionContent>
          Because light attracts bugs
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Why do Java developers wear glasses?</AccordionTrigger>
        <AccordionContent>
          Because they don’t C#
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What do developers cheer at birthday parties?</AccordionTrigger>
        <AccordionContent>
          “Hip, hip, array!!”
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  usage: [
    `import {\n  Accordion,\n  AccordionContent,\n  AccordionItem,\n  AccordionTrigger,\n} from "@/components/ui/accordion"`,
    `<Accordion type="single" collapsible>\n  <AccordionItem value="item-1">\n    <AccordionTrigger>Is it accessible?</AccordionTrigger>\n    <AccordionContent>\n      Yes. It adheres to the WAI-ARIA design pattern.\n    </AccordionContent>\n  </AccordionItem>\n</Accordion>`
  ],
};
