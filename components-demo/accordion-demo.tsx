import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Accordion</h2>
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
    </div>
  )
}
