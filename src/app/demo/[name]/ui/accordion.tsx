import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const accordion = {
  name: "accordion",
  components: {
    Accordion: (
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
  },
};
