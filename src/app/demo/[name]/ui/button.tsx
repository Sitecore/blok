import { Button } from "@/components/ui/button";

export const button = {
  name: "button",
  components: {
    Primary: <Button variant="default">Primary</Button>,
    Outline: <Button variant="outline">Outline</Button>,
    Ghost: <Button variant="ghost">Ghost</Button>,
    Link: <Button variant="link">Link</Button>,
  },
};
