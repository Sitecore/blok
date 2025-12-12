import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const textarea = {
  name: "textarea",
  defaultComponent: (
    <div className="grid gap-2 m-2 w-75">
      <Label htmlFor="basic-textarea">Message</Label>
      <Textarea id="basic-textarea" name="message" aria-label="Message" placeholder="Type your message here." autoComplete="off" />
    </div>
  ),
  usage: [
    `import { Textarea } from "@/components/ui/textarea";`,
    `<Textarea />`,
  ],
  components: {
    // Invalid state
    Invalid: (
      <div className="grid gap-2 m-2 w-75">
        <Label htmlFor="invalid-textarea">Message</Label>
        <Textarea id="invalid-textarea" name="message" placeholder="Type your message here." aria-label="Message" aria-invalid="true" autoComplete="off" />
      </div>
    ),

    // With label
    "With Label": (
      <div className="grid gap-3 m-2 w-75">
        <Label htmlFor="textarea-demo-message">Message</Label>
        <Textarea
          id="textarea-demo-message"
          name="message"
          placeholder="Type your message here."
          aria-label="Message"
          rows={6}
          autoComplete="off"
        />
      </div>
    ),

    // With label and description
    "With Label and Description": (
      <div className="grid gap-3 m-2 w-75">
        <Label htmlFor="textarea-demo-message-2">Message</Label>
        <Textarea
          id="textarea-demo-message-2"
          name="message"
          placeholder="Type your message here."
          aria-label="Message"
          rows={6}
          autoComplete="off"
        />
        <div className="text-muted-foreground text-sm">
          Type your message and press enter to send.
        </div>
      </div>
    ),

    // Disabled state
    Disabled: (
      <div className="grid gap-3 m-2 w-75">
        <Label htmlFor="textarea-demo-disabled">Disabled Textarea</Label>
        <Textarea
          id="textarea-demo-disabled"
          name="message"
          placeholder="Type your message here."
          aria-label="Disabled Textarea"
          disabled
          autoComplete="off"
        />
      </div>
    ),

    // Small size
    Small: (
      <div className="grid gap-3 m-2 w-75">
        <Label htmlFor="small-textarea">Small (3 rows)</Label>
        <Textarea
          id="small-textarea"
          name="message"
          placeholder="Small textarea"
          aria-label="Small textarea"
          rows={3}
          className="min-h-[60px]"
          autoComplete="off"
        />
      </div>
    ),

    // Large size
    Large: (
      <div className="grid gap-3 m-2 w-75">
        <Label htmlFor="large-textarea">Large (8 rows)</Label>
        <Textarea
          id="large-textarea"
          name="message"
          placeholder="Large textarea"
          aria-label="Large textarea"
          rows={8}
          className="min-h-[160px]"
          autoComplete="off"
        />
      </div>
    ),

    // With default value
    "With Default Value": (
      <div className="grid gap-3 m-2 w-75">
        <Label htmlFor="textarea-with-value">Pre-filled Textarea</Label>
        <Textarea
          id="textarea-with-value"
          name="message"
          defaultValue="This textarea comes with some pre-filled content. You can edit this text or add more content as needed."
          aria-label="Pre-filled Textarea"
          rows={4}
          autoComplete="off"
        />
      </div>
    ),
  },
};